import { Box, FormControl, InputLabel, Select, MenuItem, ListItemText } from '@mui/material';
import useBlog from '../hooks/useBlog';
import useBlogCategory from '../hooks/useBlogCategory';

const CategorySelect = () => {
    const { blogState, setBlogState } = useBlog();
    const {categories} = useBlogCategory();
    
    const handleChange = (event) => {
        setBlogState({ ...blogState, categoryId: event.target.value })
    };

    return (
        <Box sx={{ minWidth: 120, mb: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={blogState?.categoryId || ''}
                    label="Category"
                    onChange={handleChange}
                >
                    {categories.map(({ categoryId, description, title}) => (
                        <MenuItem key={categoryId} value={categoryId}>
                            <ListItemText primary={title} secondary={description} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CategorySelect;
