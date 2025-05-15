import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Container,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Typography,
    Stack,
    Box,
    Grid,
    styled,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../api/axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { EMAIL_VERIFY_FORM, OTP_VERIFY_FORM, RECAPTCHA_SITE_KEY, VERIFY_EMAIL_URL, VERIFY_OTP_URL } from '../commons/AppConstant'
import useAuth from '../hooks/useAuth';

const Wrapper = styled(Box)(({ theme }) => ({
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


export default function ResetPasswordPage() {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const [capVal, setCapVal] = useState(null);
    const captcha = useRef(null);
    const [formType, setFormType] = useState(EMAIL_VERIFY_FORM);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

        const authDetails = {
            email: formData.get('email'),
            captcha: captcha.current.getValue(),
            otp: formData.get('otp'),
        };

        captcha.current.reset();
        console.log(authDetails);
        
        if (!authDetails.email.length) {
            return toast.error("enter email!!!");
        }

        if (!emailRegex.test(authDetails.email)) {
            return toast.error("email is invalid")
        }

        try{
            let serverRoute = (formType === EMAIL_VERIFY_FORM) ? VERIFY_EMAIL_URL : VERIFY_OTP_URL;
            const response = await axios.post(serverRoute, authDetails);
            console.log(response);
            if(response.data === "verified" && formType === EMAIL_VERIFY_FORM){
                setFormType(OTP_VERIFY_FORM)
            }else{
                setAuth((prev) => {
                    return {...prev, forgotPasswordToken:response.data}
                })
                navigate("/changepassword'");
            }
        }catch(err){
            console.log(err);
            toast.error(err);
        }
    };
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
                        <Typography component="h1" variant="h5">Reset Password</Typography>
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
                        {
                            formType === EMAIL_VERIFY_FORM ? ""
                                :
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="otp"
                                    label="OTP"
                                    type="password"
                                    id="otp"
                                    autoComplete="current-password"
                                />
                        }
                        <ReCAPTCHA
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={(val) => { setCapVal(val) }}
                            ref={captcha}
                            hidden={formType != EMAIL_VERIFY_FORM}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!capVal && formType === EMAIL_VERIFY_FORM}
                            sx={{ margin: '3px 0px 2px' }}
                        >
                            {
                                formType === EMAIL_VERIFY_FORM ? "Send OTP" : "Verify OTP"
                            }
                        </Button>

                        {/* Links for forgotten password and sign up */}
                        <Grid container>
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                    Login
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
    )
}
