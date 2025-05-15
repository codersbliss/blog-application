import { Box, Chip, Typography, Link } from '@mui/material';
import useCategory from '../hooks/useCategory';

const RecommendedTopics = () => {
  const { categories} = useCategory();  
  
  return (
    <Box sx={{ p: '12px', backgroundColor: '#f5f5f5', borderRadius: '10px', mb:1 }}>
      <Typography variant="h6" gutterBottom>
        Recommended topics
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {categories.slice(0, 5).map((topic) => (
          <Chip key={topic.categoryId} label={topic.title} sx={{cursor:'pointer'}} component='a' href='#'/>
        ))}
      </Box>
      <Link href="#" sx={{ marginTop: '16px', display: 'block', textDecoration: 'none', color: 'primary.main' }}>
        See more topics
      </Link>
    </Box>
  );
};

export default RecommendedTopics;
