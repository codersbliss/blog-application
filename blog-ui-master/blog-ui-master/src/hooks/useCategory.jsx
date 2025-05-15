import { useState, useEffect } from 'react';
import { BASE_URL } from '../commons/AppConstant';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useTopic from './useTopic';

const useCategory = () => {
    const axiosPrivate = useAxiosPrivate();
    const [categories, setCategories] = useState([]);
    const { topic, setTopic } = useTopic();
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axiosPrivate.get(`${BASE_URL}/category/page`, {
                    params: {
                        pageNumber: page,
                        pageSize: 10,
                    },
                });

                const newCategories = response.data.categories.filter(
                    category => !categories.some(prev => prev.categoryId === category.categoryId)
                );

                setCategories(prevCategories => [...prevCategories, ...newCategories]);

                if (page === 0 && newCategories.length > 0) {
                    // Set initial topic from the first category
                    const initialCategory = newCategories[0];
                    setTopic({
                        topic_id: initialCategory.categoryId,
                        title: initialCategory.title,
                        users: initialCategory.subscribers,
                        description: initialCategory.description,
                    });
                }

                setHasMore(!response.data.isLastPage);
            } catch (error) {
                if (error?.response && error?.response?.status === 404) {
                    setHasMore(false);
                }
                console.error('Failed to fetch categories', error);
            } finally {
                setLoading(false); // End loading
            }
        };

        if (!loading && hasMore) {
            fetchCategories();
        }
    }, [page, topic]);

    return { categories, loading, hasMore, setPage, topic, setTopic, setCategories, setHasMore };
};

export default useCategory;
