import useAuth from './useAuth';
import api from '../api/axios';
import { REFRESH_TOKEN_URL } from '../commons/AppConstant';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    const formData = new FormData();
    formData.append('refreshToken', auth.refreshToken);
    const refresh = async () => {
        try {
            const response = await api.get(REFRESH_TOKEN_URL, {
                withCredentials: true,
            });
            // console.log(response.data);
            setAuth(response.data);
            return response.data.accessToken;
        } catch (error) {
            console.log(error);
            setAuth({accessToken:null});
            return null;
        }
    }
    return refresh;
}

export default useRefreshToken;