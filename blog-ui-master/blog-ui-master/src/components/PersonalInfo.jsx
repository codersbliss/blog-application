import {
    Box,
    Button,
    Grid,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import useAccount from '../hooks/useAccount';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'
import { GET_USER_DETAILS_URL, UPDATE_USER_DETAILS_URL } from '../commons/AppConstant';
import { toast } from 'react-toastify';
import USERSHIELDICON from '/src/assets/icons8-user-shield-64.png';

const PersonalInfo = () => {
    const {
        user:{name, email, about, accounts, }, 
        user,
        setUser, 
    } = useAccount();
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();

    const [socialLinks, setSocialLinks] = useState(accounts || [{accountId: '', platform: '', link:''}]);
    const [isEditing, setIsEditing] = useState(false);

    // Handle change for user fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    // Handle change for social links
    const handleSocialLinkChange = (index, event) => {
        const { name, value } = event.target;
        const updatedLinks = [...socialLinks];
        updatedLinks[index][name] = value;
        setSocialLinks(updatedLinks);
        setUser((prev) => ({ ...prev, accounts: updatedLinks }));
    };

    // Add a new social link field
    const handleAddSocialLink = () => {
        setSocialLinks([...socialLinks, { platform: '', link: '' }]);
    };

    // Remove a social link field
    const handleRemoveSocialLink = (index) => {
        const updatedLinks = socialLinks.filter((_, i) => i !== index);
        setSocialLinks(updatedLinks);
        setUser((prev) => ({ ...prev, accounts: updatedLinks }));
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };
    

    // Fetch user details on load
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchUser = async () => {
            try {
                const response = await axiosPrivate.get(`${GET_USER_DETAILS_URL}/${auth.id}`, {
                    signal,
                    params: {
                        userId: auth.id,
                    },
                });
                setUser({ ...response.data });
                setSocialLinks(response.data.accounts || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();

        return () => {
            controller.abort();
        };
    }, []);

    //edit profile request
    const updateUser = async () => {
        if(!email || email != auth?.email){
            return toast.error('email cannot be updated!!!');
        }
        try {
            const response = await axiosPrivate.post(UPDATE_USER_DETAILS_URL, user);
            console.log(response); //debug
            toast.success('profile updated successfully');
            setIsEditing(false);
        } catch (err) {
            toast.error("something went wrong!!! try after sometime");
            console.error(err);
        }
    };
    
    return (
        <Box sx={{ flexGrow: 1, padding: 3, m: 2 }}>
            <Stack direction="row" spacing={4}>
                <img src={USERSHIELDICON} alt="User Shield Icon" />
                <Typography variant='h4' gutterBottom>
                    Personal Information
                    <Typography variant="body2" gutterBottom>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                </Typography>
            </Stack>
            <Box component="form" sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            value={name}
                            name="name"
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={email}
                            name="email"
                            onChange={handleInputChange}
                            InputProps={{ readOnly: true }}
                            disabled={true}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            disabled={!isEditing}
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="About"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={about}
                            name="about"
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </Grid>

                    {/* Social Media Links Section */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Social Media Links
                        </Typography>
                        {socialLinks.map((link, index) => (
                            <Stack key={index} direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <TextField
                                    name="platform"
                                    label="Platform"
                                    variant="outlined"
                                    value={link.platform}
                                    onChange={(e) => handleSocialLinkChange(index, e)}
                                    fullWidth
                                    disabled={!isEditing}
                                />
                                <TextField
                                    name="link"
                                    label="Link"
                                    variant="outlined"
                                    value={link.link}
                                    onChange={(e) => handleSocialLinkChange(index, e)}
                                    fullWidth
                                    disabled={!isEditing}
                                />
                                {isEditing && (
                                    <Button variant="outlined" color="error" onClick={() => handleRemoveSocialLink(index)}>
                                        Remove
                                    </Button>
                                )}
                            </Stack>
                        ))}
                        {isEditing && (
                            <Button variant="contained" color="info" onClick={handleAddSocialLink}>
                                Add Social Media Link
                            </Button>
                        )}
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 2 }}
                    disabled={!isEditing}
                    onClick={updateUser}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 2, ml: 2 }}
                    onClick={toggleEditMode}
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </Button>
            </Box>
        </Box>
    );
};

export default PersonalInfo;
