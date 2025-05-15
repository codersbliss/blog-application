/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Popover, Typography, Button, Box, Avatar, Stack } from '@mui/material';

const ProfilePopover = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
    <Stack spacing={2} direction={'row'} alignItems={'center'}>
      <Avatar src={user.avatarUrl} alt={user.name} onClick={handleClick} sx={{ cursor: 'pointer' }}/>
      <p>
        {user?.name}
      </p>
    </Stack>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2} sx={{maxWidth:'250px'}}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="h6">{user.email}</Typography>
          <Typography variant="body2" color="textSecondary" sx={{textWrap:'balance'}}>
            {user.about}
          </Typography>
          <Button variant="contained" color="primary" onClick={user.onFollowClick}
             sx={{borderRadius:'50px', mt:2}}
          >
            Follow
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default ProfilePopover;
