import useAxiosPrivate from './useAxiosPrivate';
import { BASE_URL } from '../commons/AppConstant';

const useCategoryRecomendedBlogs = () => {
    const axiosPrivate = useAxiosPrivate();

    const fetchBlogs = async (categoryId) => {
        try {
            const response = await axiosPrivate.get(`${BASE_URL}/post/recommended/category/${categoryId}`);
            return response.data;
        } catch (err) {
            console.log(err);
            return [];            
        }
    };

    return fetchBlogs;
};

export default useCategoryRecomendedBlogs;
