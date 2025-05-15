import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import BlogFeedContext from '../context/BlogFeedContext';
import { GET_BLOGS_URL } from '../commons/AppConstant'

const BlogFeedProvider = ({ children }) => {
  const PAGE_SIZE = 10;
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [feedType, setFeedType] = useState(GET_BLOGS_URL); // Default feed type

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${feedType}?pageNumber=${page}&pageSize=${PAGE_SIZE}`;
      const response = await axiosPrivate.get(url, {
        params: {
          userId: auth.id,
        },
        headers: {
          'Authorization': `Bearer ${auth?.accessToken}`,
        }
      });
      console.log(response.data.posts);
      setBlogs(prevBlogs => [...prevBlogs, ...response.data.posts]);
      setHasMore(!response.data.isLastPage);
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setLoading(false);
    }
  }, [feedType, page, axiosPrivate, auth.id, auth?.accessToken]);

  useEffect(() => {
    fetchBlogs();
  }, [feedType]);

  const changeFeedType = (type) => {
    setPage(0);
    setBlogs([]);
    setFeedType(type);
  };

  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (!loading && window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setPage(prevPage => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [loading]);

  return (
    <BlogFeedContext.Provider value={{ blogs, hasMore, loading, changeFeedType, fetchBlogs }}>
      {children}
    </BlogFeedContext.Provider>
  );
};

BlogFeedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlogFeedProvider;
