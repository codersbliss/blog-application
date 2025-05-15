import { Box, Typography, Avatar, Grid, Button, Card, CardContent, Link } from '@mui/material';
import { Email, Phone, LocationOn, Cake, Person } from '@mui/icons-material';

const Profile = () => {
  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', padding: 3 }}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Avatar
                src="https://img.icons8.com/material-sharp/24/user.png" // Replace with actual image URL
                alt="Jeremy Rose"
                sx={{ width: 150, height: 150, margin: '0 auto' }}
              />
              <Typography variant="h5" align="center" sx={{ mt: 2 }}>Jeremy Rose</Typography>
              <Typography variant="subtitle1" align="center">Product Designer</Typography>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" sx={{ mr: 1 }}>Send message</Button>
                <Button variant="outlined">Contacts</Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>Rankings</Typography>
                <Typography variant="h4" color="primary">8,6 <span role="img" aria-label="stars">⭐️⭐️⭐️⭐️⭐️</span></Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Work</Typography>
                <Typography variant="body1"><strong>Spotify New York</strong> - Primary</Typography>
                <Typography variant="body2">170 William Street, New York, NY 10038-78 212-312-51</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}><strong>Metropolitan Museum</strong> - Secondary</Typography>
                <Typography variant="body2">525 E 68th Street, New York, NY 10551-78 156-187-60</Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Skills</Typography>
                <Typography variant="body1">Branding, UI/UX, Web Design, Packaging, Print & Editorial</Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Contact Information</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1"><Phone /> +1 123 456 7890</Typography>
                    <Typography variant="body1"><LocationOn /> 525 E 68th Street, New York, NY 10551-78 156-187-60</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1"><Email /> <Link href="mailto:hello@jeremyrose.com">hello@jeremyrose.com</Link></Typography>
                    <Typography variant="body1">Site: <Link href="http://www.jeremyrose.com" target="_blank" rel="noopener noreferrer">www.jeremyrose.com</Link></Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Basic Information</Typography>
                <Typography variant="body1"><Cake /> Birthday: June 5, 1992</Typography>
                <Typography variant="body1"><Person /> Gender: Male</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
