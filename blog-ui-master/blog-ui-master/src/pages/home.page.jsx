import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { Box, CssBaseline, Stack } from '@mui/material';
import BlogFeedProvider from '../Providers/BlogFeedProvider';

const Home = () => {
  return (
    <Box>
      <CssBaseline />
      <Stack spacing={2} justifyContent='space-between' direction='row'>
        <BlogFeedProvider>
          <Sidebar />
          <Feed />
        </BlogFeedProvider>
        <Rightbar />
      </Stack>
    </Box>
  )
}

export default Home;
