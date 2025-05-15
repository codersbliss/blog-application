import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar"
import { Box, CssBaseline, Stack } from '@mui/material';
import UserAccountProvider from "../Providers/UserAccountProvider";
import { ToastContainer } from "react-toastify";

const ProfilePage = () => {

  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Stack direction="row" spacing={2}>
        <UserAccountProvider>
          <Box sx={{ position: 'relative', width: '100%', display: 'flex' }}>
            <ProfileSidebar />
            <Box sx={{ flexGrow: 1, p: 2, pl: 0 }}>
              <Outlet />
            </Box>
          </Box>
        </UserAccountProvider>
      </Stack>
    </>
  )
}

export default ProfilePage
