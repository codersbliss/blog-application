/* eslint-disable react/prop-types */
import { Button } from '@mui/material';

const CustomButton = ({ clickHandler, text, width, border }) => {
    return (
        <Button
            variant="contained"
            sx={{ 
                backgroundColor: '#2c3e50', 
                '&:hover': { backgroundColor: '#2c3e50' }, 
                borderRadius: border || 5, 
                textTransform:'capitalize',
                maxWidth:width || '200px',
            }}
            onClick={clickHandler}
        >
            {text}
        </Button>
    )
}

export default CustomButton;
