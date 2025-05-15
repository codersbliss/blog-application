/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import {
    Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Stack, Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Bookmark, Comment, Favorite, FavoriteBorder } from '@mui/icons-material';
import { BASE_URL } from '../commons/AppConstant';
import formatRelativeTime from '../utils/date_formatter';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import formatNumber from '../utils/number_formatter';
import { useNavigate } from 'react-router-dom';
import Comments from './Comments';

const Blog = ({ blog, likes, bookmarks, liked, bookmarked }) => {
    const { postId, title, description, bannerUrl, lastUpdated, user: { name }, } = blog;
    const [isLiked, setIsLiked] = useState(liked);
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);
    const [likeCount, setLikeCount] = useState(likes);
    const [bookmarkCount, setBookmarkCount] = useState(bookmarks);

    //comment states
    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(prev => !prev);
    };

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const handleLike = async () => {
        try {
            const response = await axiosPrivate.post(`${BASE_URL}/activity/like/post/${postId}`, null, {
                params: { userId: auth.id },
            });
            console.log(response.data);
            setIsLiked(!isLiked);
            setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        } catch (err) {
            console.error("Error liking the post", err);
        }
    };

    const handleBookmark = async () => {
        try {
            const response = await axiosPrivate.post(`${BASE_URL}/activity/bookmark/post/${postId}`, null, {
                params: { userId: auth.id },
            });
            console.log(response.data);
            setIsBookmarked(!isBookmarked);
            setBookmarkCount(prev => isBookmarked ? prev - 1 : prev + 1);
        } catch (err) {
            console.error("Error bookmarking the post", err);
        }
    };


    const handleReadMoreClick = () => {
        navigate(`/read-more/${postId}`);
    };

    const handlePublicProfileClick = () => {
        navigate(`/public/profile/${blog?.user?.userId}`)
    }
    
    return (
        <Card sx={{ margin: 5 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'red', cursor: 'pointer' }} aria-label="recipe" onClick={handlePublicProfileClick}>
                        {name[0]?.toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={name?.charAt(0).toUpperCase() + name?.slice(1)}
                subheader={formatRelativeTime(lastUpdated)}
            />
            <CardMedia
                component="img"
                height={400}
                image={`${BASE_URL}/file/name/${bannerUrl}`}
                alt="blog_banner"
            />
            <CardContent>
                <Typography variant="h6" color="text.primary">
                    {title}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label="add to favorites" onClick={handleLike}>
                        {isLiked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
                    </IconButton>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {formatNumber(likeCount)}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label="save for later" onClick={handleBookmark}>
                        {isBookmarked ? <Bookmark sx={{ color: 'skyblue' }} /> : <Bookmark />}
                    </IconButton>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {formatNumber(bookmarkCount)}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="read more" onClick={handleReadMoreClick}>
                        <ReadMoreIcon color='primary' />
                    </IconButton>
                    <IconButton aria-label="comments" onClick={toggleComments}>
                        <Comment color="primary" />
                    </IconButton>
                </div>
            </CardActions>
            <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
                {showComments && <Comments postId={postId} />}
            </Stack>
        </Card>
    );
};

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        bannerUrl: PropTypes.string.isRequired,
        lastUpdated: PropTypes.string.isRequired,
        postId: PropTypes.number.isRequired,
        user: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    likes: PropTypes.number.isRequired,
    bookmarks: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
    bookmarked: PropTypes.bool.isRequired,
};

export default Blog;
