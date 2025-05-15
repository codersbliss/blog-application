/* eslint-disable react/prop-types */
import { ReadMore } from '@mui/icons-material';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../commons/AppConstant';
import useReadMoreBlog from '../hooks/useReadMoreBlog';

const BlogCard = ({ blog }) => {
    const lastUpdated = blog?.lastUpdated ? new Date(blog.lastUpdated) : null;
    const navigate = useNavigate();
    const { setCurrentBlogId } = useReadMoreBlog();

    const handleReadMoreClick = () => {
        setCurrentBlogId(blog?.postId);
        navigate(`/read-more/${blog?.postId}`);
    };

    const formatDate = (date) => {
        return date?.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };
    return (
        <Card sx={{ maxWidth: 345, position: 'relative', '&:hover': { boxShadow: 10 } }}>
            <CardMedia
                component="img"
                height="200"
                image={`${BASE_URL}/file/name/${blog?.bannerUrl}`}
                alt={blog?.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {blog?.title}
                </Typography>
                <Typography variant="body2">
                    {blog?.description}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                    Last Updated: {formatDate(lastUpdated)}
                </Typography>
                <Button variant="contained" color="primary" startIcon={<ReadMore />} onClick={handleReadMoreClick}>
                    Try
                </Button>
            </CardContent>
        </Card>
    );
};

export default BlogCard;