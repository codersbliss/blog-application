/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback, useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import SearchResult from '../components/SearchResult';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../commons/AppConstant';

const SearchResultContent = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('blog');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const type = params.get('type');
        const keyword = params.get('keyword');

        if (type && keyword) {
            setKeyword(keyword);
            setSearchType(type);    
        }
    }, [location.search]);

    const search = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get(`${BASE_URL}/search/results`, {
                params: {
                    type: searchType,
                    keyword,
                    pageNumber: page,
                },
            });
            setSearchResults(prevResults => [...prevResults, ...response.data.results]);
            setHasMore(!response.data.isLastPage);
        } catch (error) {
            console.error('Error searching:', error);
        } finally {
            setLoading(false);
        }
    }, [axiosPrivate, searchType, keyword, page]);

    useEffect(()=>{
        if(keyword && searchType){
            setSearchResults([]);
            search();
        }
    }, [keyword, searchType])

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            if (hasMore && !loading) {
                setPage(prev => prev + 1)
            }
        }
    }, [hasMore, loading, setPage]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Search Results for {`"${keyword}..."`} in {searchType}s
            </Typography>
            <Grid container spacing={4}>
                <SearchResult searchResults={searchResults} searchType={searchType}/>
            </Grid>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Typography variant="body1">Loading...</Typography>
                </Box>
            )}
        </Container>
    );
};

export default SearchResultContent;