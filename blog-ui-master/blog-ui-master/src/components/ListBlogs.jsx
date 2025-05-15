/* eslint-disable react/prop-types */
import { Bookmark, BookmarkAdd, Favorite, Share, Timer } from '@mui/icons-material'
import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import formatRelativeTime from '../utils/date_formatter'
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../commons/AppConstant';

const ListBlogs = ({ blogs }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    return (
        <Grid container spacing={2}>
            {blogs && blogs.map((blog, index) => {

                const likes = blog.activities.filter(activity => activity.activityType === 'LIKE').length;
                const bookmarks = blog.activities.filter(activity => activity.activityType === 'BOOKMARK').length;
                const liked = blog.activities.some(activity => activity.activityType === 'LIKE' && activity.userId === auth.id);
                const bookmarked = blog.activities.some(activity => activity.activityType === 'BOOKMARK' && activity.userId === auth.id);

                return <Grid item xs={12} key={index}>
                    <Card sx={{ display: 'flex', mb: 2, cursor: 'pointer' }} onClick={() => { navigate(`/read-more/${blog?.postId}`); }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <CardContent>
                                <Typography variant="h6">{blog?.title}</Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {blog?.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Typography variant='span' sx={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                                    <Timer sx={{ fontSize: '18px', marginRight: '4px', color: 'orange' }} />
                                    {formatRelativeTime(blog?.lastUpdated)}
                                </Typography>
                                <Typography variant='span' sx={{ fontSize: '12px', display: 'flex', alignItems: 'center', padding: '2' }}>
                                    <Favorite sx={{ fontSize: '18px', color: liked ? 'red' : 'gray' }} />  {likes}
                                </Typography>
                                <Typography variant='span' sx={{ fontSize: '12px', display: 'flex', alignItems: 'center', padding: '2' }}>
                                    <Bookmark sx={{ fontSize: '18px', color: bookmarked ? 'green' : 'gray' }} />  {bookmarks}
                                </Typography>
                                <IconButton aria-label="share">
                                    <Share sx={{ fontSize: '18px', color: 'skyblue' }} />
                                </IconButton>
                                <IconButton aria-label="save">
                                    <BookmarkAdd sx={{ fontSize: '18px', color: bookmarked ? 'skyblue' : 'black' }} />
                                </IconButton>
                            </CardActions>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={`${BASE_URL}/file/name/${blog?.bannerUrl}`}
                            alt={blog?.title}
                        />
                    </Card>
                </Grid>
            })}
        </Grid>
    )
}

export default ListBlogs
