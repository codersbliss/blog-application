import { useContext } from 'react';
import { BlogContext } from '../pages/editor.page';

const useBlog = () => useContext(BlogContext);

export default useBlog;
