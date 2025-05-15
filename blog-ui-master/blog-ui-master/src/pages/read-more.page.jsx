import { Chip, Stack, Typography } from '@mui/material';
import BlogList from '../components/BlogList';
import BlogPost from '../components/BlogPost';
import ReadMoreProvider from '../Providers/ReadMoreProvider';
import ScrollToTopButton from '../components/ScrollToTopButton';

const ReadMorePage = () => {
  return (
    <>
      <ReadMoreProvider>
        <BlogPost />
        <Stack spacing={2} alignItems={'center'} justifyContent={'center'}>
          <Chip label="More Blogs" color='primary' />
          <Typography variant='h5' p={2} m={3}>
            Our Latest Blog Posts
          </Typography>
        </Stack>
        <BlogList />
        <ScrollToTopButton/>
      </ReadMoreProvider>
    </>
  );
};

export default ReadMorePage;
