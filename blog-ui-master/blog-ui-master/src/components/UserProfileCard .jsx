/* eslint-disable react/prop-types */
import { Avatar, Badge, Box, Card, CardContent, Paper, styled, Typography } from '@mui/material';
import { useState } from 'react';
import CustomButton from './CustomButton';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));

const UserProfileCard = ({ user, followerCount, isFollowing, handleToggleFollow, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Box
            sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Badge
                sx={{ cursor: 'pointer' }}
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <SmallAvatar alt="Remy Sharp" src="https://img.icons8.com/material-sharp/24/user.png" />
                }
            >
                <Avatar alt="Travis Howard" src="https://img.icons8.com/material-sharp/24/user.png" />
            </Badge>
            {children}

            {/* Hover Card */}
            {isHovered && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '110%',
                        left: 0,
                        zIndex: 10,
                        width: 300,
                    }}
                >
                    <Paper elevation={4} sx={{ padding: 2 }}>
                        <Card sx={{ display: 'flex', alignItems: 'center' }} elevation={0}>
                            <Badge
                                sx={{ cursor: 'pointer' }}
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <SmallAvatar alt="Remy Sharp" src="https://img.icons8.com/material-sharp/24/user.png" />
                                }
                            >
                                <Avatar alt="Travis Howard" src="https://img.icons8.com/material-sharp/24/user.png" />
                            </Badge>
                            <CardContent>
                                <Typography variant="h6">{user.name}</Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {followerCount} Followers
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {user?.about}
                                </Typography>
                                <CustomButton
                                    text={isFollowing ? 'Unfollow' : 'Follow'}
                                    clickHandler={handleToggleFollow}
                                />
                            </CardContent>
                        </Card>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};

export default UserProfileCard;
