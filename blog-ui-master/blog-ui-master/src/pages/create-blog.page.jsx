import {useState} from 'react';
import {Box, TextField, CssBaseline, Typography, Chip, Divider} from '@mui/material';
import CategorySelect from '../components/CategorySelect';
import AppSplitter from '../components/AppSplitter';
import TextEditor from '../components/TextEditor';
import JsonToHtmlParser from '../commons/JsonToHtmlParser';
import BlogBanner from '../components/BlogBanner';
import useBlog from '../hooks/useBlog';
import '../commons/BlogTextEditor.css';
import BANNER_IMG_URL from "/src/assets/blog_banner.png";

const CreateBlogPage = () => {
  const { blogState, setBlogState} = useBlog();
  const { title, banner, content, description, tags} = blogState;

  const [newTag, setNewTag] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag.length >= 3 && !tags.includes(trimmedTag) && tags.length < 5) {
      const updatedTags = [...tags, trimmedTag];
      setBlogState(prevState => ({
        ...prevState,
        tags: updatedTags,
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setBlogState(prevState => ({
      ...prevState,
      tags: updatedTags,
    }));
  };

  const handleImageError = (e) => {
    e.target.src = {BANNER_IMG_URL}; 
  };

  return (
    <>
      <CssBaseline />
      <AppSplitter>
        <Box p={2} sx={{ pt: 1, overflowY: 'auto' }}>
          <BlogBanner/>
          <TextField
            variant="outlined"
            sx={{ width: '100%', mb: 5 }}
            placeholder="Blog Title"
            value={title || ''}
            onKeyDown={handleKeyDown}
            onChange={e => setBlogState(prevState => ({ ...prevState, title: e.target.value }))}
          />
          <TextField
            variant="outlined"
            sx={{ width: '100%', mb: 5 }}
            placeholder="Add a small description or introduction about your blog..."
            value={description || ''}
            onKeyDown={handleKeyDown}
            onChange={e => setBlogState(prevState => ({ ...prevState, description: e.target.value }))}
          />
          <Box>
            {tags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                sx={{ mr: 1, mb: 1 }}
                style={{ backgroundColor: '#40739e', color: 'white' }}
              />
            ))}
            <TextField
              label="Tags"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleAddTag();
                }
              }}
              sx={{ minWidth: '150px', width: '100%', mb: 3 }}
            />
          </Box>
          <CategorySelect />
          <TextEditor />
        </Box>
        <Box sx={{width:"100%"}}>
          
          <Typography variant='h6' align='center' mb={2} sx={{ wordWrap: 'break-word', width:"100%" }}>
            {title && title.length > 0 ? title : 'Untitled Blog'}
          </Typography>
          
          <Divider></Divider>
          
          {banner && <img src={banner} alt="Cover" style={{ width: '100%', height: '80%' }} onError={handleImageError}/>}
          
          <Typography variant='body2' align='left' mb={2} sx={{ wordWrap: 'break-word' }}>
            {description && description.length > 0 ? description : ''}
          </Typography>

          <Box>
            <JsonToHtmlParser editorJsData={ content ? content : []} />
          </Box>

        </Box>
      </AppSplitter>
    </>
  );
};

export default CreateBlogPage;
