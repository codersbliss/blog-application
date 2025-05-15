/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
    Avatar, Box, Button, IconButton, TextField, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCommentIcon from '@mui/icons-material/AddComment';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { BASE_URL } from '../commons/AppConstant';
import formatRelativeTime from '../utils/date_formatter';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [userComment, setUserComment] = useState(null);

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    useEffect(() => {
        if(!postId) return;
        fetchComments();
    }, [currentPage, postId]);

    useEffect(() => {
        // Check if the logged-in user has already commented
        const existingComment = comments.find(comment => comment.user.userId === auth.id);
        if (existingComment) {
            setUserComment(existingComment);
        }
    }, [comments, auth.id]);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const response = await axiosPrivate.get(`${BASE_URL}/comments/post/${postId}`, {
                params: { pageNumber: currentPage },
            });
            setComments(prev => {
                const newComments = response.data.comments.filter(newComment =>
                    !prev.some(existingComment => existingComment.commentId === newComment.commentId)
                );
                return [...prev, ...newComments];
            });
            setHasMore(!response.data.isLastPage);
        } catch (err) {
            console.error("Error fetching comments", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim() || userComment) return; // Prevent adding a new comment if the user has already commented
        try {
            const response = await axiosPrivate.post(`${BASE_URL}/comments/add`, {
                postId,
                commentText: newComment,
            });
            setComments(prevComments => {
                const updatedComments = [response.data, ...prevComments];
                return updatedComments;
            });
            setNewComment('');
            setUserComment(response.data); // Store the user's comment to prevent further comments
        } catch (err) {
            console.error("Error adding comment", err);
        }
    };

    const handleEditComment = async (commentId, commentText) => {
        try {
            await axiosPrivate.put(`${BASE_URL}/comments/edit`, {
                commentText,
                commentId,
            });
            setComments(prevComments => prevComments.map(comment =>
                comment.commentId === commentId ? { ...comment, commentText } : comment
            ));
            setEditCommentId(null);
        } catch (err) {
            console.error("Error editing comment", err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axiosPrivate.delete(`${BASE_URL}/comments/${commentId}`);
            setComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
            if (commentId === userComment?.commentId) setUserComment(null);
        } catch (err) {
            console.error("Error deleting comment", err);
        }
    };

    const handleScroll = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && !isLoading && hasMore) {
            setCurrentPage(prev => prev + 1);
        }
    };

    // Sort comments: prioritize user's comment and then latest comments first
    const sortedComments = userComment
        ? [userComment, ...comments.filter(comment => comment.commentId !== userComment.commentId).sort((a, b) => new Date(b.commentDate) - new Date(a.commentDate))]
        : comments.sort((a, b) => new Date(b.commentDate) - new Date(a.commentDate));

    return (
        <Box onScroll={handleScroll} sx={{ maxHeight: 400, overflow: 'auto', width: '100%', p: 2, m: 2 }}>
            {!userComment && (
                <Box display="flex" alignItems="center" mt={2}>
                    <TextField
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment"
                        fullWidth
                    />
                    <Button onClick={handleAddComment} disabled={isLoading}>
                        <AddCommentIcon />
                    </Button>
                </Box>
            )}
            <List>
                {sortedComments.map((comment) => (
                    <ListItem key={comment.commentId}>
                        <ListItemAvatar>
                            <Avatar>{comment.user.name.charAt(0).toUpperCase()}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={comment.user.userId === auth.id ? "You" : comment.user.name}
                            secondary={
                                <>
                                    {editCommentId === comment.commentId ? (
                                        <TextField
                                            fullWidth
                                            value={comment.commentText}
                                            onChange={(e) => setComments(prevComments =>
                                                prevComments.map(c =>
                                                    c.commentId === comment.commentId ? { ...c, commentText: e.target.value } : c
                                                )
                                            )}
                                            onBlur={() => handleEditComment(comment.commentId, comment.commentText)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleEditComment(comment.commentId, comment.commentText)}
                                        />
                                    ) : (
                                        <>
                                            <Typography variant="body2">
                                                {comment.commentText}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {comment.lastEdited
                                                    ? `Edited ${formatRelativeTime(comment.lastEdited)}`
                                                    : `Posted ${formatRelativeTime(comment.commentDate)}`}
                                            </Typography>
                                        </>
                                    )}
                                </>
                            }
                        />
                        {comment.user.userId === auth.id && (
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" onClick={() => setEditCommentId(comment.commentId)}>
                                    <EditIcon sx={{color:'black'}}/>
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteComment(comment.commentId)}>
                                    <DeleteIcon sx={{color:'red'}}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        )}
                    </ListItem>
                ))}
            </List>
            {isLoading && hasMore && <Typography>Loading more comments...</Typography>}
        </Box>
    );
};

export default Comments;
