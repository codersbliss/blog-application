import { useState } from 'react'
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext.js';

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({accessToken: null});
    const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem("isAuthenticated")) || false);
    return (
        <AuthContext.Provider value={{ auth, setAuth, isAuthenticated, setIsAuthenticated }}>
           {children} 
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
