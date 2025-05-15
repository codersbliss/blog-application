import PropTypes from 'prop-types';
import { useState } from 'react';
import UserContext from '../context/UserContext';

const UserAccountProvider = ({ children }) => {
    const [user, setUser] = useState({
        userId: null,
        name: '',
        email: '',
        about: '',
        profileImg: '',
        accounts: null,
    });

    return (
        <UserContext.Provider value={
            {
                user,
                setUser,
            }
        }
        >
            {children}
        </UserContext.Provider>
    )
}

UserAccountProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserAccountProvider;
