import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRouteWrapper = ({allowedRoles}) => {
  const {auth, auth:{roles}} = useAuth();
  const location = useLocation();
  if (auth?.accessToken && roles?.find(role => allowedRoles?.includes(role))) {
    return <Outlet />;
  }
  if(auth?.accessToken){
    return <Navigate to="/unauthorized" state={{ from: location}} replace/> 
  }
  return <Navigate to="/login" state={{ from: location}} replace/>;
};


export default PrivateRouteWrapper;
