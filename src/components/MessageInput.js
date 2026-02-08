import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function MessageInput({ message, setMessage, onSubmit }) {
    const messageRef = React.useRef(null);

    const handleClick = () => {
        if (message.trim() !== '') {
            onSubmit();
            setMessage('');
        }
    };

    return (
        <Box sx={{ px: 0.5, py: 0.5, width:'100%' }} >
            <FormControl fullWidth>
                <TextField
                    placeholder="Type something here…"
                    aria-label="Message"
                    // multiline
                    minRows={3}
                    maxRows={10}
                    inputRef={messageRef}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                            handleClick();
                        }
                    }}
                    sx={{ '& textarea': { minHeight: 30 } }}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end" sx={{ p: 0 }}>
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        sx={{ borderRadius: 2, minWidth: 0, padding: '4px 12px' }}
                                        endIcon={<SendRoundedIcon />}
                                        onClick={handleClick}                                    >
                                        Send
                                    </Button>
                                </InputAdornment>
                            )
                        }
                    }}
                />
            </FormControl>
        </Box>
    );
}
