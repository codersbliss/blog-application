import { Typography, Box, CardMedia, List, ListItem, ListItemText } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Import a style of your choice
import { nanoid } from 'nanoid';

const parseEditorJsJson = (blocks) => {
    
    if (!blocks) {
        throw new Error('Invalid Editor.js data');
    }

    return blocks.map((block) => {
        switch (block.type) {
            case 'paragraph':
                return <Typography key={nanoid()} variant="body1" gutterBottom mt={2}>{block.data.text}</Typography>
            case 'header':
                return <Typography key={nanoid()} variant={`h${block.data.level}`} gutterBottom mt={2}>{block.data.text}</Typography>;
            case 'list':
                return (
                    <List
                        key={nanoid()}
                        component={block.data.style === 'ordered' ? 'ol' : 'ul'}
                        sx={{
                            listStyleType: block.data.style === 'ordered' ? 'decimal' : 'disc',
                            pl: 2,
                            fontSize: '18px',
                            '& .MuiListItem-root': {
                                display: 'list-item',
                                paddingLeft: 0,
                                paddingTop: 0.5,
                                paddingBottom: 0.5,
                            },
                            '& .MuiListItemText-primary': {
                                color: 'rgba(0, 0, 0, 0.87)',
                            },
                        }}
                    >
                        {block.data.items.map((item) => (
                            <ListItem key={nanoid()}>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))}
                    </List>
                );
            case 'image':
                return (
                    <CardMedia
                        component="img"
                        image={block.data.file.url}
                        alt={block.data.caption || ''}
                        sx={{ mt: 2 }}
                        key={nanoid()}
                    />
                );
            case 'quote':
                return (
                    <Box key={nanoid()} component="blockquote" sx={{ borderLeft: '5px solid', paddingLeft: 2, margin: 2 }}>
                        <Typography variant="body1">{block.data.text}</Typography>
                        {block.data.caption && (
                            <Typography variant="caption" component="cite">{block.data.caption}</Typography>
                        )}
                    </Box>
                );
            case 'code':
                return (
                    <Box key={nanoid()} component="pre" sx={{ overflowX: 'auto', borderRadius: 1 }}>
                        <SyntaxHighlighter language="javascript" style={tomorrow}>
                            {block.data.code}
                        </SyntaxHighlighter>
                    </Box>
                );
            default:
                console.warn(`Unknown block type "${block.type}"`);
                return null;
        }
    });
};

// eslint-disable-next-line react/prop-types
const JsonToHtmlParser = ({ editorJsData }) => {
    return (
        parseEditorJsJson(editorJsData)
    );
};
export default JsonToHtmlParser;
