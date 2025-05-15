/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Stack, Typography, Tabs, Tab, ListItem, ListItemText, List } from "@mui/material";
import CustomButton from '../components/CustomButton';
import { useEffect, useState } from "react";
import PublishedBlogList from "../components/PublishedBlogList";
import FollowersList from "../components/FollwersList";
import useUserProfile from "../hooks/useUserProfile";
import { useParams } from "react-router-dom";
import NotFoundPage from '../pages/404.page'
import useAuth from "../hooks/useAuth";
import useFetchUserFollowers from "../hooks/useFetchUserFollowers";
import formatNumber from '../utils/number_formatter'
import { toast, ToastContainer } from "react-toastify";


const UserPublicProfilePage = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const { userId } = useParams();
    const fetchUser = useUserProfile();
    const [user, setUser] = useState({});


    const { auth } = useAuth();  //logged in user
    const { fetchFollowers, followUser, unfollowUser } = useFetchUserFollowers();
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        if (!user?.userId) return;
        // Check if the current user is following this user
        const fetchInitialFollowers = async () => {
            const followers = await fetchFollowers(user?.userId);
            setFollowerCount(followers?.length);
            setFollowers(followers);
            const isUserFollowing = followers.some(follower => follower?.userId === auth?.id);
            setIsFollowing(isUserFollowing);
        };

        fetchInitialFollowers();
    }, [auth?.id, user?.userId]);

    const handleToggleFollow = async (user) => {
        if (user?.userId == auth?.id) {
            toast.error('You cannot follow your self!!!');
            return;
        }
        if (isFollowing) {
            await unfollowUser(user.userId);
            setFollowerCount(followerCount - 1);
        } else {
            await followUser(user.userId);
            setFollowerCount(followerCount + 1);
        }
        setIsFollowing(!isFollowing);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        if (!userId) return;
        const getUser = async () => {
            try {
                const user = await fetchUser(userId);
                if (user == null) {
                    return <NotFoundPage />;
                }
                setUser(user);
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [userId])


    return (
        <>
            <ToastContainer/>
            <Box sx={{ display: 'flex', flexDirection: 'row', p: 10 }}>
                <Box sx={{ maxWidth: '250px' }}>
                    <Stack spacing={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3 }}>
                            <Avatar
                                alt="Remy Sharp"
                                src="https://img.icons8.com/material-sharp/24/user.png"
                                sx={{ width: 56, height: 56 }}
                            />
                            <Typography variant="h5">{user?.name}</Typography>
                        </Box>
                        <Typography variant="body1">
                            {user?.about}
                        </Typography>
                        <Typography variant="body1">
                            {formatNumber(followerCount)} Followers
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <List>
                            {
                                user && user?.accounts?.map((account) => {
                                    return (
                                        <ListItem component="a" href={account.link} target="_blank" rel="noopener noreferrer" key={account.accountId}>
                                            <ListItemText primary={`@${account.platform}`} />
                                        </ListItem>
                                    )
                                })
                            }

                        </List>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                            <CustomButton clickHandler={() => handleToggleFollow(user)} text={isFollowing ? 'following' : 'follow'} width={'200px'} border={5} />
                        </Box>
                    </Stack>
                </Box>
                <Box sx={{ flex: 1, pl: 10 }}>
                    <Tabs value={selectedTab} onChange={handleTabChange} aria-label="profile tabs">
                        <Tab label="Published" selectedTab />
                        <Tab label="Following" />
                    </Tabs>
                    <Box sx={{ pt: 3 }}>
                        {selectedTab === 0 && <PublishedBlogList />}
                        {selectedTab === 1 && <FollowersList followers={followers} />}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default UserPublicProfilePage;
