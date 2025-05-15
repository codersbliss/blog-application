import Box from '@mui/material/Box';
import Blog from './Blog';
import useBlogFeed from '../hooks/useBlogFeed';
import useAuth from '../hooks/useAuth';

const Feed = () => {
  const { blogs, loading, hasMore } = useBlogFeed();
  const {auth} = useAuth();

  return (
    <Box flex={4} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      {
        blogs.map((blog, index) => {
          const likes = blog.activities.filter(activity => activity.activityType === 'LIKE').length;
          const bookmarks = blog.activities.filter(activity => activity.activityType === 'BOOKMARK').length;
          const liked = blog.activities.some(activity => activity.activityType === 'LIKE' && activity.userId === auth.id);
          const bookmarked = blog.activities.some(activity => activity.activityType === 'BOOKMARK' && activity.userId === auth.id);

          return <Blog key={index} blog={blog} likes={likes} bookmarks={bookmarks} liked={liked} bookmarked={bookmarked} />;
        })
      }
      {loading && hasMore && <p>Loading...</p>}
    </Box>
  );
};

export default Feed;
