import { createContext, useCallback, useEffect, useState } from 'react';
import EditorNavBar from '../components/EditorNavBar';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useUploadFromFileUrl from '../hooks/useUploadFromFileUrl.js';
import useAuth from '../hooks/useAuth';
import { BASE_URL, CREATE_POST_URL, UPDATE_POST_URL, WAITING_TIME_FOR_AUTO_SAVE } from '../commons/AppConstant.jsx';
import { toast } from 'react-toastify';
import CreateBlogPage from './create-blog.page';
import EditorJS from '@editorjs/editorjs';
import { tools } from '../components/tools';
import InternalServerError from '../pages/500.page.jsx';
import { useNavigate } from 'react-router-dom';

export const BlogContext = createContext({});

function EditorPage() {
    const axiosPrivate = useAxiosPrivate();
    const uploader = useUploadFromFileUrl();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [textEditor, setTextEditor] = useState({ isReady: false });
    const [savingState, setSavingState] = useState({ drafting: false, publishing: false, uploadSuccess: false });
    const [blogState, setBlogState] = useState({
        title: '',
        content: [],
        tags: [],
        description: '',
        categoryId: null,
        banner: null,
        blogId: null,
        prevBanner: null,
        draft: true,
    });

    const { blogId, title, content, categoryId, banner, prevBanner, description, tags, draft } = blogState;

    const initializeTextEditor = (blocks) => {
        const editor = new EditorJS({
            holder: 'textEditor',
            data: blocks,
            tools: tools,
            autofocus: true,
            placeholder: "Let's write an awesome story",
            onChange: async () => {
                try {
                    const data = await editor.save();
                    setBlogState((prev) => ({
                        ...prev,
                        content: data.blocks,
                    }));
                } catch (error) {
                    console.error('Error saving content:', error);
                }
            }
        });
        setTextEditor(editor);
    };

    const sendUpdatedBlogToServer = useCallback(async (DRAFT) => {
        if (!prevBanner) {
            console.log('cannot save blog !!!banner is not uploaded yet!!');
            return;
        }
        try {
            const payload = {
                postId: blogId,
                postTitle: title || 'Untitled Blog',
                postContent: JSON.stringify(content),
                postDescription: description || '',
                tags: tags || [],
                bannerUrl: prevBanner,
                draft: DRAFT,
                categoryId: categoryId,
                userId: auth?.id,
            };
            console.log(payload);  //debug
            const response = await axiosPrivate.post(
                blogId ? UPDATE_POST_URL : CREATE_POST_URL,
                payload,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            console.log(response); //debug
            return response.data?.postId;
        } catch (error) {
            console.log(error);
            return null;
        }
    }, [auth?.id, axiosPrivate, blogId, categoryId, content, description, prevBanner, tags, title]);

    const validateInputs = () => {
        if (title.length < 3) {
            toast.error('Enter a proper title for your blog');
            return false;
        }
        if (!categoryId) {
            toast.error('Select a category for your blog');
            return false;
        }
        if (!content.length) {
            toast.error('No content for your blog');
            return false;
        }
        if (description.length <= 3) {
            toast.error('Enter a proper description for your blog');
            return false;
        }
        if (!banner) {
            toast.error('Blog banner is missing');
            return false;
        }
        if (!tags || !tags.length) {
            toast.error('Tags are missing');
            return false;
        }
        return true;
    };

    const handleUpload = useCallback(async () => {
        if (!prevBanner) {
            try {
                const IMG_NAME = await uploader(banner);
                if (!IMG_NAME) {
                    console.log("uploaded banner name " + IMG_NAME);
                    setSavingState({ drafting: false, publishing: false, uploadSuccess: false });
                    return <InternalServerError />;
                }
                setBlogState((prev) => ({
                    ...prev,
                    prevBanner: IMG_NAME,
                    banner: `${BASE_URL}/file/name/${IMG_NAME}`,
                }));
                setSavingState((prev) => ({ ...prev, uploadSuccess: true }));
            } catch (err) {
                console.error(err);
                setSavingState({ drafting: false, publishing: false, uploadSuccess: false });
                return <InternalServerError />;
            }
        } else {
            setSavingState((prev) => ({ ...prev, uploadSuccess: true }));
        }
    }, [banner, prevBanner, uploader]);

    const publish = async () => {
        if (!validateInputs()) return;

        setSavingState((prev) => ({ ...prev, publishing: true }));
        await handleUpload();
    };

    const saveDraft = useCallback(async () => {
        if (title.length < 3 || !categoryId || !content.length || !banner) {
            console.log('Error in draft saving...');
            return;
        }

        setSavingState((prev) => ({ ...prev, drafting: true }));
        await handleUpload();
    }, [title.length, categoryId, content.length, banner, handleUpload]);

    useEffect(() => {
        const saveBlog = async () => {
            const { drafting, publishing, uploadSuccess } = savingState;
            if (uploadSuccess) {
                const isDraft = drafting;
                try {
                    const BLOG_ID = await sendUpdatedBlogToServer(isDraft);
                    if (!BLOG_ID) {
                        return <InternalServerError />;
                    }
                    setBlogState((prev) => ({
                        ...prev,
                        blogId: BLOG_ID,
                    }));
                    sessionStorage.setItem('curr_blog_id', BLOG_ID);
                    if (publishing) {
                        sessionStorage.removeItem('curr_blog_id');
                        navigate('/feed');
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Something went wrong!!!");
                } finally {
                    setSavingState({ drafting: false, publishing: false, uploadSuccess: false });
                }
            }
        };
        saveBlog();
    }, [savingState, sendUpdatedBlogToServer, navigate]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (draft) saveDraft();
        }, WAITING_TIME_FOR_AUTO_SAVE * 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, [draft, saveDraft]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchBlog = async () => {
            try {
                const BLOG_ID = sessionStorage.getItem('curr_blog_id');

                if (!BLOG_ID) {
                    initializeTextEditor({ blocks: [] });
                    return;
                }

                const response = await axiosPrivate.get(`/post/${BLOG_ID}`, { signal });
                const { postId, title, content, bannerUrl, draft, lastUpdated, description, categoryDT:{categoryId}, tags} = response.data;

                initializeTextEditor({ blocks: JSON.parse(content) });

                setBlogState({
                    blogId: postId,
                    title: title,
                    description: description,
                    content: JSON.parse(content),
                    prevBanner: bannerUrl,
                    banner: `${BASE_URL}/file/name/${bannerUrl}`,
                    categoryId: parseInt(categoryId),
                    tags: tags.map(tag => tag.name),
                    draft: draft,
                    lastUpdated: lastUpdated,
                });

            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.log('Error fetching blog:', error);
                }
            }
        };

        fetchBlog();

        return () => {
            controller.abort();
        };

    }, []);

    return (
        <BlogContext.Provider value={{ blogState, setBlogState, textEditor, setTextEditor, saveDraft, publish, savingState}}>
            <EditorNavBar />
            <CreateBlogPage />
        </BlogContext.Provider>
    );
}

export default EditorPage;
