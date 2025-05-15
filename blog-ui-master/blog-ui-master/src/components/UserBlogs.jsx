import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../commons/AppConstant';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ListBlogs from './ListBlogs';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [page, setPage] = useState(0);
    const [isLastPage, setLastPage] = useState(false);
    const { auth } = useAuth();
    const location = useLocation();
    const { pathname } = location;

    const isDraft = pathname.includes('drafts');

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchBlogs = async () => {
            try {
                const URL = `${BASE_URL}/post/published/${auth.id}/${isDraft}?pageNumber=${page}`;
                const response = await axiosPrivate.get(URL, { signal });
                setLastPage(response.data.isLastPage);
                setBlogs(prev => [...prev, ...response.data.posts]);
            } catch (err) {
                console.error(err);
            }
        };

        if (!isLastPage) fetchBlogs();

        return () => {
            controller.abort();
        };
    }, [page, pathname]);

    const handleInfiniteScroll = async () => {
        try {
            if (!isLastPage &&
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight) {
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => {
            window.removeEventListener("scroll", handleInfiniteScroll);
        };
    }, []);

    // Reset blogs and page number when URL changes
    useEffect(() => {
        setBlogs([]);
        setPage(0);
        setLastPage(false);
    }, [pathname]);

    return (
        <>
            <ListBlogs blogs={blogs}/>
        </>
    );
}

export default UserBlogs;
