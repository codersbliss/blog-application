import { Grid, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import useReadMoreBlog from '../hooks/useReadMoreBlog';
import { BASE_URL, PAGE_SIZE } from '../commons/AppConstant';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import BlogCard from '../components/BlogCard'

const BlogList = () => {
    const axiosPrivate = useAxiosPrivate();
    const { blog } = useReadMoreBlog(); 
    const [blogList, setBlogList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    // Fetch category blogs
    useEffect(() => {
        const fetchCategoryBlogs = async () => {
            if (!blog?.categoryId) return;
            setLoading(true);
            try {
                const url = `${BASE_URL}/post/category/${blog?.categoryId}`;
                const response = await axiosPrivate.get(url, {
                    params: { pageNumber: page, pageSize: PAGE_SIZE },
                });
                setBlogList(prevBlogs => [...prevBlogs, ...response.data.posts]);
                setHasMore(!response.data.isLastPage);
            } catch (error) {
                console.error('Error fetching category blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryBlogs();
    }, [page, blog?.categoryId, axiosPrivate]);

    // Reset on category change
    useEffect(() => {
        setBlogList([]);
        setPage(0);
    }, [blog?.categoryId]);

    // Handle infinite scrolling
    useEffect(() => {
        const handleInfiniteScroll = () => {
            if (!loading && hasMore && window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setPage(prev => prev + 1);
            }
        };
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => window.removeEventListener('scroll', handleInfiniteScroll);
    }, [loading, hasMore]);

    return (
        <Grid container spacing={5} sx={{ padding: 2 }}>
            {blogList.filter(b => b.postId !== blog.id).map((filteredBlog, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <BlogCard blog={filteredBlog}/>
                </Grid>
            ))}
            {loading && (
                <Grid item xs={12} display="flex" justifyContent="center">
                    {hasMore ? <CircularProgress /> : <p>No more blogs to show.</p>}
                </Grid>
            )}
        </Grid>
    );
};

export default BlogList;
