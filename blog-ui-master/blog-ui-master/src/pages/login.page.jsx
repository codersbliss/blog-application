import { useLocation, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Typography, Stack, Box, Grid, styled, } from '@mui/material';
import { LOGIN_URL } from '../commons/AppConstant';
import axios from '../api/axios';
import { useEffect } from 'react';

// Styled components for layout and styling
const Wrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#fff"
}));

const FormWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const FormBody = styled("form")(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1)
}));

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.form?.pathname || '/feed';
  const { setAuth, isAuthenticated, setIsAuthenticated } = useAuth();

  const toggleIsAuthenticated = () => {
    setIsAuthenticated(prev => !prev);
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const authDetails = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    // Email and password regex for validation
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    // Validate email
    if (!authDetails.email.length) {
      return toast.error("Enter email!!!");
    }

    if (!emailRegex.test(authDetails.email)) {
      return toast.error("Email is invalid");
    }

    // Validate password
    if (!passwordRegex.test(authDetails.password)) {
      return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter");
    }

    // Server request for authentication
    try {
      const response = await axios.post(LOGIN_URL, authDetails);
      setAuth(response.data);
      console.log(response.data);
      navigate(from, { replace: true });
    } catch (err) {
      if (err?.response?.status === 404) {
        toast.error("Email or Password is wrong");
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated])

  return (
    <Wrapper>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <FormWrapper>
          <Stack alignItems="center" spacing={2}>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Sign in</Typography>
          </Stack>
          <FormBody noValidate onSubmit={handleSubmit}>
            {/* Email input field */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {/* Password input field */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* Remember me checkbox */}
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" />}
              label="Remember me"
              onChange={toggleIsAuthenticated}
              checked={isAuthenticated}
            />
            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: '3px 0px 2px', backgroundColor: '#2c3e50', '&:hover': { backgroundColor: '#2c3e50' } }}
            >
              Sign In
            </Button>
            {/* Links for forgotten password and sign up */}
            <Grid container>
              <Grid item xs>
                <Link href="/reset_password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </FormBody>
        </FormWrapper>
        {/* Footer */}
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
              .blog
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default Login;
