import { Box } from '@mui/material'
import UNAUTH_ERR from '/src/assets/401.svg';
const Unauthorized = () => {
  return (
    <Box>
        <img src={UNAUTH_ERR}/>
    </Box>
  )
}

export default Unauthorized;
