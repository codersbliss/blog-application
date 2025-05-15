import { useContext } from 'react';
import ReadMoreBlogContext from '../context/ReadMoreBlogContext';

const useReadMoreBlog = () => useContext(ReadMoreBlogContext);

export default useReadMoreBlog;