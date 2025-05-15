import { useEffect, useState } from 'react';
import axios from '../api/axios';
import LoaderWithLabel from '../pages/loading.page';
import BlogCategoryContext from '../context/BlogCategoryContext';
import { ALL_CATEGORY_URL } from '../commons/AppConstant';
import { Outlet, useNavigate } from 'react-router-dom';


const CategoryProvider = () => {
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => { 
          try {
                const response = await axios.get(ALL_CATEGORY_URL);
                // console.table(response.data)
                setCategories(response.data);
            } catch (err) {
                navigate('/500');
            }finally{   
                setLoading(false);
            }
        };

        !categories ? fetchCategories() : setLoading(false);
  }, [categories]); 

  if (loading) {
    return <LoaderWithLabel />; 
  }

  return (
    <BlogCategoryContext.Provider value={{categories, setCategories}}>
        <Outlet/>
    </BlogCategoryContext.Provider>
  )
}

export default CategoryProvider;
