/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import ListBlogs from "./ListBlogs";
import { BASE_URL, } from "../commons/AppConstant";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { Box } from "@mui/material";

const PublishedBlogList = () => {

    const [blogs, setBlogs] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [page, setPage] = useState(0);
    const [isLastPage, setLastPage] = useState(false);
    const { auth } = useAuth();
    const { userId } = useParams();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchBlogs = async () => {
            try {
                const URL = `${BASE_URL}/post/published/${auth.id}/false?pageNumber=${page}`;

                const response = await axiosPrivate.get(URL, { signal });
                console.log(response.data);
                setLastPage(response.data.isLastPage);
                setBlogs(prev => [...prev, ...response.data.posts]);
            } catch (err) {
                console.error(err);
            }
        };

        if (!isLastPage) fetchBlogs();

        return () => {
            controller.abort();
        };
    }, [page, userId]);

    const handleInfiniteScroll = async () => {
        try {
            if (!isLastPage &&
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight) {
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => {
            window.removeEventListener("scroll", handleInfiniteScroll);
        };
    }, []);

    // Reset blogs and page number when URL changes
    useEffect(() => {
        setBlogs([]);
        setPage(0);
        setLastPage(false);
    }, [userId]);
    return (
        <>
            <Box sx={{scroll: 'auto', height:'450px'}}>
                <ListBlogs blogs={blogs}/>
            </Box>
        </>
    )
}

export default PublishedBlogList;
