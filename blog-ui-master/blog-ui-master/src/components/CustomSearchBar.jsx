// src/components/CustomSearchBar.jsx
import { useCallback, useState } from 'react';
import { Paper, InputBase, IconButton, MenuItem, Select, List, ListItem, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { BASE_URL } from '../commons/AppConstant';

export default function CustomSearchBar() {
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('blog');
    const [suggestions, setSuggestions] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const getSuggestions = useCallback(async () => {
        try {
            const response = await axiosPrivate.get(`${BASE_URL}/search/suggestions`, {
                params: {
                    type: searchType,
                    keyword,
                },
            });
            return response.data.suggestions;
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            return [];
        }
    }, [axiosPrivate, keyword, searchType])

    const handleKeywordChange = async (e) => {
        const newKeyword = e.target.value;
        setKeyword(newKeyword);

        if (newKeyword.trim()) {
            const suggestionResults = await getSuggestions(searchType, newKeyword);
            setSuggestions(suggestionResults);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        setSuggestions([]);
        setKeyword('');
        navigate(`/search?type=${searchType}&keyword=${encodeURIComponent(suggestion)}`);
    };

    return (
        <Box sx={{ position: 'relative', width: 400 }}>
            <Paper
                component="div"
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 10,
                    backgroundColor: '#f5f6fa',
                    overflow: 'hidden',
                }}
            >
                <Select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    sx={{
                        ml: 1,
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                >
                    <MenuItem value="blog">Blog</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="tag">Tag</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                </Select>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={`Search ${searchType}s...`}
                    value={keyword}
                    onChange={handleKeywordChange}
                    autoFocus
                />
                <IconButton sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>

            {suggestions.length > 0 && (
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        mt: 1,
                        maxHeight: 200,
                        overflowY: 'auto',
                    }}
                >
                    <List>
                        {suggestions.map((suggestion, index) => (
                            <ListItem
                                key={index}
                                onClick={() => handleSelectSuggestion(suggestion)}
                            >
                                <Typography variant="body1">{suggestion}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
}
