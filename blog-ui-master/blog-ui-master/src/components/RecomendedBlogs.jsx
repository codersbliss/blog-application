import { ReadMore, Timer } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../commons/AppConstant';
import useCategoryRecomendedBlogs from '../hooks/useCategoryRecomendedBlogs';
import formatRelativeTime from '../utils/date_formatter';
import ProfilePopover from './ProfilePopover';
import useTopic from '../hooks/useTopic';

const RecommendedBlogs = () => {
    const { topic } = useTopic();
    const fetchBlogs = useCategoryRecomendedBlogs();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    // Navigate to the blog's read-more page
    const handleReadMoreClick = (postId) => {
        navigate(`/read-more/${postId}`);
    };

    useEffect(() => {
        const getBlogs = async () => {
            try {
                // Fetch blogs based on the current topic
                const fetchedBlogs = await fetchBlogs(topic?.topic_id);
                setBlogs(fetchedBlogs);
            } catch (error) {
                console.error('Failed to fetch recommended blogs:', error);
            }
        };

        getBlogs();
    }, [topic]);

    return (
        <Stack spacing={2} justifyContent={'center'} mt={10} p={10}>
            <Typography variant='h4'>
                Recommended stories
            </Typography>
            <Grid container spacing={2}>
                {blogs.map((blog, index) => {
                    const likes = blog.activities.filter(activity => activity.activityType === 'LIKE').length;

                    return (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card sx={{ maxWidth: 345, m: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${BASE_URL}/file/name/${blog?.bannerUrl}`}
                                    alt={blog?.title || 'Blog image'}
                                />
                                <CardContent>
                                    <ProfilePopover user={blog?.user} />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {blog?.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {blog?.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Typography variant='span' sx={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                                        <Timer sx={{ fontSize: '18px', marginRight: '4px', color: 'orange' }} />
                                        {formatRelativeTime(blog?.lastUpdated)}
                                    </Typography>
                                    <Typography variant='span' sx={{ fontSize: '12px', display: 'flex', alignItems: 'center', padding: '2' }}>
                                        <FavoriteIcon sx={{ fontSize: '18px', color: 'red' }} />
                                        {likes}
                                    </Typography>
                                    <IconButton aria-label="share">
                                        <ShareIcon sx={{ fontSize: '18px', color: 'skyblue' }} />
                                    </IconButton>
                                    <IconButton aria-label="read more" onClick={() => handleReadMoreClick(blog?.postId)}>
                                        <ReadMore color='primary' sx={{ fontSize: '18px', color: 'success' }} />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
};

export default RecommendedBlogs;
