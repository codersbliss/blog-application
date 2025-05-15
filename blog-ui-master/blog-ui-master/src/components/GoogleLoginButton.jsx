import { Box } from '@mui/material';
import axios from '../api/axios';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const responseMessage = async (res) => {
    try {
      console.log(res);
      const response = await axios.get('/login/oauth2/code/google', {
        headers: {
          Authorization: `Bearer ${res.credential}`,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <Box
      sx={{ margin: '3px 0px 2px', display: 'flex', justifyContent: 'center' }}
    >
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </Box>
  );
};

export default GoogleLoginButton;
