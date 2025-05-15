import useAxiosPrivate from './useAxiosPrivate'
import { BASE_URL } from '../commons/AppConstant';

const useUserProfile = () => {
    const axiosPrivate = useAxiosPrivate();
    const fetchUser = async (userId) => {
        try{
            const response = await axiosPrivate.get(`${BASE_URL}/user/${userId}`);
            console.log(response.data);
            
            return response.data;
        }catch(err){
            console.log(err);
            return null;            
        }
    }
    return fetchUser
}

export default useUserProfile
