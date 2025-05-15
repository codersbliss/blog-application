import { Notifications } from '@mui/icons-material';
import {
    Badge,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { BASE_URL } from '../commons/AppConstant';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import formatRelativeTime from './../utils/date_formatter'

export default function NotificationMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    // Fetch notifications from API
    const fetchNotifications = useCallback(async (page) => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get(`${BASE_URL}/notifications?pageNumber=${page}&pageSize=10`);
            console.log(response.data);
            const { notifications: newNotifications, isLastPage: lastPage } = response.data;
            setNotifications(prev => page === 0 ? newNotifications : [...prev, ...newNotifications]);
            setIsLastPage(lastPage);
            if (page === 0) {
                setUnreadCount(newNotifications.filter(notif => !notif.isRead).length);
            }
        } catch (error) {
            console.error('Error fetching notifications', error);
        } finally {
            setLoading(false);
        }
    }, [axiosPrivate]);

    // Fetch initial notifications
    useEffect(() => {
        fetchNotifications(pageNumber);
    }, [pageNumber]);

    // Open menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Mark notification as read
    const handleMarkAsRead = useCallback(async (notificationId) => {
        await axiosPrivate.post(`${BASE_URL}/notifications/${notificationId}/read`);
        fetchNotifications(0); 
        setUnreadCount(prevCount => prevCount - 1);
    }, [axiosPrivate, fetchNotifications]);

    // Load more notifications
    const loadMoreNotifications = useCallback(() => {
        if (!isLastPage && !loading) {
            fetchNotifications(pageNumber + 1);
            setPageNumber(prev => prev + 1);
        }
    }, [fetchNotifications, isLastPage, loading, pageNumber]);

    return (
        <>
            <IconButton onClick={handleMenuOpen}>
                <Badge badgeContent={unreadCount} color="error">
                    <Notifications />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                    style: { width: 350, maxHeight: 500 },
                }}
            >
                {notifications.length === 0 && (
                    <ListItemText primary="No new notifications" style={{ padding: 16 }} />
                )}
                <List>
                    {notifications.map(notification => (
                        <ListItem key={notification.id} onClick={() => handleMarkAsRead(notification.id)} button>
                            <ListItemText primary={notification.message} secondary={formatRelativeTime(notification.createdAt)} />
                        </ListItem>
                    ))}
                    {loading && (
                        <ListItemText
                            primary={<CircularProgress size={20} />}
                            style={{ textAlign: 'center', padding: 16 }}
                        />
                    )}
                    {!isLastPage && (
                        <ListItemText
                            primary="Load more"
                            style={{ textAlign: 'center', padding: 16, cursor: 'pointer' }}
                            onClick={loadMoreNotifications}
                        />
                    )}
                </List>
            </Menu>
        </>
    );
}
