import { useContext } from 'react'
import BlogCategoryContext from '../context/BlogCategoryContext';

const useBlogCategory = () => useContext(BlogCategoryContext);

export default useBlogCategory;
