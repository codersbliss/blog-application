/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';
import Blog from './Blog';

const SearchResult = ({ searchResults, searchType }) => {
    const { auth } = useAuth();
    console.log(searchType);

    if (searchResults.length === 0) {
        return (
            <Typography variant="h6" color="text.secondary">
                No results found.
            </Typography>
        );
    }

    const renderResults = () => {
        switch (searchType) {
            case 'user':
                return (
                    'ksdfjkl'
                )
            case 'blog':
            case 'tag':
                return (
                    <Box flex={4} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {searchResults.map((blog, index) => {
                            const likes = blog.activities.filter(activity => activity.activityType === 'LIKE').length;
                            const bookmarks = blog.activities.filter(activity => activity.activityType === 'BOOKMARK').length;
                            const liked = blog.activities.some(activity => activity.activityType === 'LIKE' && activity.userId === auth.id);
                            const bookmarked = blog.activities.some(activity => activity.activityType === 'BOOKMARK' && activity.userId === auth.id);
                            return <Blog key={index} blog={blog} likes={likes} bookmarks={bookmarks} liked={liked} bookmarked={bookmarked} />;
                        })}
                    </Box>
                );
            case 'category':
                return "<CategoryTagResult results={searchResults} />";
            default:
                return null;
        }
    };

    return (
        <Grid container spacing={4}>
            {searchResults && renderResults()}
        </Grid>
    );
};

export default SearchResult;
