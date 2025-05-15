import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { BASE_URL } from '../commons/AppConstant';

const useFetchUserFollowers = () => {
    const axiosPrivate = useAxiosPrivate();

    const fetchFollowers = async (userId) => {
        try {
            const { data } = await axiosPrivate.get(`${BASE_URL}/connect/${userId}/followers`);
            return data;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const followUser = async (userId) => {
        try {
            await axiosPrivate.post(`${BASE_URL}/connect/${userId}/follow`);
        } catch (err) {
            console.log('Error following user:', err);
        }
    };

    const unfollowUser = async (userId) => {
        try {
            await axiosPrivate.post(`${BASE_URL}/connect/${userId}/unfollow`);
        } catch (err) {
            console.log('Error unfollowing user:', err);
        }
    };

    return { fetchFollowers, followUser, unfollowUser };
};

export default useFetchUserFollowers;
