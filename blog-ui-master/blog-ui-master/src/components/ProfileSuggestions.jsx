import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProfileSuggestions = () => {
  // Sample data (you can replace this with actual profile data)
  const suggestions = [
    {
      id: 1,
      name: 'Michelle Kwan',
      description: 'Aspiring Narrative Designer/Game Writer',
      avatarUrl: 'https://img.icons8.com/material-sharp/24/user.png',
    },
    {
      id: 2,
      name: 'Sophia Omarji',
      description: 'Music Psychologist | User Experience Enthusiast',
      avatarUrl: 'https://img.icons8.com/material-sharp/24/user.png',
    },
    // Add more profiles here...
  ];

  return (
    <div>
      {suggestions.map((profile) => (
        <div key={profile.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <Avatar alt={profile.name} src={profile.avatarUrl} />
          <div style={{ marginLeft: 16, flexGrow: 1 }}>
            <Typography variant="h6">{profile.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {profile.description}
            </Typography>
          </div>
          <Button variant="outlined" size="small" >
            Follow
          </Button>
        </div>
      ))}
      <Typography variant="body2" color="textSecondary">
        See more suggestions
      </Typography>
    </div>
  );
};

export default ProfileSuggestions;
