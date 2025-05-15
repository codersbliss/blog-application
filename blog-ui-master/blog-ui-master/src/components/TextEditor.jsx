import { CssBaseline, Box} from '@mui/material';

const TextEditor = () => {
    return (
        <>
            <CssBaseline />
            <Box id="textEditor" sx={{ margin: 2, padding: 2, border: '1px solid #ddd', borderRadius: '4px' }}></Box>
        </>
    );
};

export default TextEditor;
