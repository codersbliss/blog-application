import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Avatar,
    Badge, Button
} from '@mui/material';
import { styled } from '@mui/system';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import CustomSearchBar from './CustomSearchBar';
import NotificationMenu from './NotificationMenu';
import LOGO from '/src/assets/logo.png';

const Logo = styled('img')({
    height: '40px',
    marginRight: '20px',
});
const Icons = styled(Box)(({ theme }) => ({
    display: 'none',
    gap: '20px',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.up("sm")]: {
        display: "flex"
    }
}));

const UserProfileBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}));

const Search = styled('div')({
    flexGrow: 1,
    border: 'none',
});

export default function PrimaryNavbar() {
    const navigate = useNavigate();

    const { auth: { name, accessToken } } = useAuth();

    const userProfileClick = () => {
        navigate('/profile/info')
    }

    const handleHomeClick = () => {
        navigate('/feed')
    }

    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
                <Toolbar>
                    <Logo src={LOGO} alt="Logo" onClick={handleHomeClick} sx={{ cursor: 'pointer' }} />
                    <Search>
                        {accessToken && (
                            <CustomSearchBar />
                        )}
                    </Search>
                    {
                        accessToken ?
                            <>
                                <Icons>
                                    <Badge color='error' sx={{ cursor: 'pointer' }} onClick={() => { navigate('/editor') }}>
                                        <Edit />
                                    </Badge>

                                    <NotificationMenu />
                                    <IconButton color='inherit' onClick={userProfileClick}>
                                        <Avatar src='https://img.icons8.com/material-sharp/24/user.png' sx={{ width: 30, height: 30, cursor: 'pointer' }} />
                                    </IconButton>
                                </Icons>
                                <UserProfileBox onClick={userProfileClick}>
                                    <Avatar src='https://img.icons8.com/material-sharp/24/user.png' sx={{ width: 30, height: 30, cursor: 'pointer' }} />
                                    <Typography variant='span'>{name}</Typography>
                                </UserProfileBox>
                            </>
                            :
                            <Icons>
                                <Button variant="contained"
                                    sx={{ backgroundColor: '#2c3e50', '&:hover': { backgroundColor: '#2c3e50' }, borderRadius: 5 }}
                                    onClick={() => { navigate('/login'); }}
                                >
                                    Log in
                                </Button>
                                <Button variant="contained"
                                    sx={{ color: 'black', backgroundColor: '#ecf0f1', '&:hover': { backgroundColor: '#ecf0f1' }, borderRadius: 5 }}
                                    onClick={() => { navigate('/signup'); }}
                                >
                                    signup
                                </Button>
                            </Icons>
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}
