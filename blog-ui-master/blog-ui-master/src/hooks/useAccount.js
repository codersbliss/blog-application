import { useContext } from 'react'
import UserContext from '../context/UserContext'

const useAccount = () => useContext(UserContext);

export default useAccount;