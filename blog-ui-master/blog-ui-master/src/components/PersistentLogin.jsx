import { useEffect, useState } from 'react'
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import LoaderWithLabel from '../pages/loading.page';
import { Outlet } from 'react-router-dom';

const PersistentLogin = () => {
    const {auth, isAuthenticated} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    useEffect(()=>{
        let isMounted = true;
        const verifyRefreshToken  = async ()=>{
            try{
                await refresh();
            }
            catch(err){
                console.log(err);
            }
            finally{
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        return ()=>{
            isMounted = false;
        }
    }, [auth, refresh])
    useEffect(()=>{
        // console.log(`isLoading : ${isLoading}`);
        // console.log(`aT : ${JSON.stringify(auth?.accessToken)}`);
        // console.log(`roles : ${JSON.stringify(auth?.roles)}`);
    }, [isLoading, auth?.accessToken, auth?.roles])
  return (
    <>
        {
            !isAuthenticated
                ? <Outlet/>
            : isLoading 
                ? <LoaderWithLabel/>
                : <Outlet/> 
        }

    </>
  )
}

export default PersistentLogin
