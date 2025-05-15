import { Link, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Box, Stack } from '@mui/material';
import { ExitToApp, Info, PendingActions, Public, Publish, QueryStats } from '@mui/icons-material';
import useLogout from '../hooks/useLogout';
import useAccount from '../hooks/useAccount';

const ProfileSidebar = () => {
  const menuItems = [
    { text: 'Personal Information', icon: <Info />, link: './info' },
    { text: 'Published Blogs', icon: <Publish />, link: './published' },
    { text: 'Draft', icon: <PendingActions />, link: './drafts' },
    { text: 'Community Stats', icon: <QueryStats />, link: './stats' },
    { text: 'Social Networks', icon: <Public />, link: './accounts' },
  ];

  const logout = useLogout();
  const navigate = useNavigate();
  const { user: { name } } = useAccount();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 300, p: 2, bgcolor: 'background.paper' }}>
      <Box position='fixed'>
        <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
          <Avatar
            alt={name}
            src="https://img.icons8.com/material-sharp/24/user.png"
            sx={{ width: 56, height: 56 }}
          />
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">1.2k Followers</Typography>
        </Stack>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              component={Link}
              to={item.link}
              key={index}
              button
              sx={{ mb: 1, '&:hover': { bgcolor: 'action.hover' } }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem
            onClick={handleLogout}
            sx={{ mt: 2, '&:hover': { bgcolor: 'action.hover' } }}
          >
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default ProfileSidebar;
