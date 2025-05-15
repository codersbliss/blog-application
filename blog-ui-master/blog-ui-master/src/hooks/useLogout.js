import useAuth from './useAuth'

const useLogout = () => {
    const {setAuth} = useAuth();
    const clearCookies = () => {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
    };
    const logout = ()=>{
        setAuth({accessToken: null});
        localStorage.clear(); 
        sessionStorage.clear();
        clearCookies();
    }
    return logout;
}

export default useLogout
