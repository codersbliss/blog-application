/* eslint-disable react/prop-types */
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ListUsers = ({ users }) => {
  const navigate = useNavigate();
  return (
    <div>
      {users.length === 0 ? (
        <Typography>No users available</Typography>
      ) : (
        <List>
          {users.map((user) => (
            <ListItem key={user.id} alignItems="center">
              <ListItemAvatar>
                <Avatar src={user.avatarUrl} alt={user.name} />
              </ListItemAvatar>
              <ListItemText
                primary={<a href={`/public/profile/${user?.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>{user.name}</a>}
                secondary={user.about}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => { navigate(`/public/profile/${user?.userId}`) }}
              >
                Follow
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ListUsers;
