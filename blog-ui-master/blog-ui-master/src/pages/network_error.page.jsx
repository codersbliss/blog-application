import { Box, CssBaseline, Typography } from "@mui/material"
import NET_ERR from '/src/assets/net_error.png';

const NetworkErrorPage = () => {
  return (
    <>
        <CssBaseline/>
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center'
        }}>
            <Box sx={{width: '400px', height:'auto'}}>
                <img src={NET_ERR} style={{width:'100%', height:'auto'}}></img>
            </Box>
            <Typography variant="h5" component="div" gutterBottom>
                Look&rsquo;s like you are on a slow network!!!
            </Typography>
            <Typography variant="p" component="div" gutterBottom>
                come again when you are are connected!!
            </Typography>
        </Box>
    </>
  )
}

export default NetworkErrorPage
