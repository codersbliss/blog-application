import { List, ListItem, ListItemText, Button, Typography, Box, IconButton, ListItemAvatar } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';
import useBlogCategory from '../hooks/useBlogCategory';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { SUBSCRIBE_TOPIC_URL } from '../commons/AppConstant';
import formatNumber from '../utils/number_formatter';

const TopicsList = () => {
    const { categories, setCategories } = useBlogCategory();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const handleFollowClick = async (category) => {
        const isFollowing = category.subscribers.includes(auth.id);

        try {
            await axiosPrivate.post(SUBSCRIBE_TOPIC_URL, {
                userId: auth.id,
                categoryId: category.categoryId,
            });

            // Update local state to reflect the change
            setCategories(prevCategories => 
                prevCategories.map(cat =>
                    cat.categoryId === category.categoryId
                        ? { ...cat, subscribers: isFollowing 
                            ? cat.subscribers.filter(subId => subId !== auth.id)
                            : [...cat.subscribers, auth.id] 
                          }
                        : cat
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', margin: 'auto', mt: 1, mb: 1 }}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Topics to follow
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Explore topics" />
                </ListItem>
                {categories.sort((a, b) => a.title.localeCompare(b.title)).slice(0, 3)
                .map((category) => (
                    <ListItem key={category.categoryId}>
                        <IconButton edge='start'><ArticleIcon /></IconButton>
                        <ListItemText primary={category.title} secondary={`${category.description} ・ ${formatNumber(category.subscribers.length)} followers`} />
                        <ListItemAvatar>
                            <Button 
                                variant="contained" 
                                color={category?.subscribers?.includes(auth.id) ? 'info' : 'success'} 
                                sx={{ borderRadius: '22px', fontSize: '10px' }}
                                onClick={() => handleFollowClick(category)}
                            >
                                {category.subscribers.includes(auth.id) ? 'Unfollow' : 'Follow'}
                            </Button>
                        </ListItemAvatar>
                    </ListItem>
                ))}
                <ListItem>
                    <Link to={`/topics`} style={{ marginTop: '16px', display: 'block', textDecoration: 'none', color: 'primary.main' }}>
                        See more topics
                    </Link>
                </ListItem>
            </List>
        </Box>
    );
};

export default TopicsList;
