import { useContext } from 'react';
import BlogFeedContext from '../context/BlogFeedContext';

const useBlogFeed = () => useContext(BlogFeedContext);

export default useBlogFeed;