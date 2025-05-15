import { Button, Stack, Typography } from '@mui/material';
import useTopic from '../hooks/useTopic';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { SUBSCRIBE_TOPIC_URL } from '../commons/AppConstant';

const TopicBanner = () => {
    const { topic, setTopic } = useTopic();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    // Handler for follow/unfollow click
    const handleFollowClick = async () => {
        if (!topic?.topic_id || !auth?.id) return;

        try {
            // Send request to follow/unfollow the topic
            await axiosPrivate.post(SUBSCRIBE_TOPIC_URL, {
                userId: auth.id,
                categoryId: topic.topic_id,
            });

            // Update the topic's users list
            setTopic(prev => {
                const updatedUsers = [...prev.users];
                if (updatedUsers.includes(auth.id)) {
                    // Remove user if already following
                    return { ...prev, users: updatedUsers.filter(user => user !== auth.id) };
                } else {
                    // Add user if not following
                    return { ...prev, users: [...updatedUsers, auth.id] };
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Stack spacing={2} justifyContent={'center'} alignItems={'center'} mt={10}>
            <Typography variant='h2'>
                {topic?.title || 'Loading...'}
            </Typography>
            <Typography variant='body1'>
                Topic . 1M Stories . {topic?.users?.length || 0} Followers
            </Typography>
            <Typography variant='h5' >
                {topic?.description}
            </Typography>
            <Button
                sx={{
                    borderRadius: '50px',
                    border: '1px solid black',
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'white',
                        borderColor: 'black',
                        color: 'black',
                    },
                    boxShadow: 'none',
                }}
                variant='contained'
                onClick={handleFollowClick}
            >
                {topic?.users?.includes(auth?.id) ? "Following" : "Follow"}
            </Button>
        </Stack>
    );
};

export default TopicBanner;
