import React from 'react';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import MessageInput from './MessageInput';
import MessageBox from './MessageBox';
import {useChatMessages} from '../hooks/useChatMessages';


export default function ChatModal() {

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const { messagesList, sendMessage, resetMessagesList } = useChatMessages();

    const handleOpen = () => {
        setOpen(true);
        resetMessagesList();
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        sendMessage(message);
    }

    const dialogContentRef = React.useRef(null);
    React.useEffect(() => {
        const container = dialogContentRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messagesList]);

    return (
        <>
            <Fab color="primary" aria-label="message"
                sx={{ position: 'fixed', bottom: 20, right: 16 }}
                onClick={handleOpen}>
                <ChatIcon />
            </Fab>

            <Dialog open={open} onClose={handleClose}
                slotProps={{
                    paper: { sx: { maxHeight: 500, } },
                }}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Customer Service
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers
                    ref={dialogContentRef}
                    sx={{
                        minHeight: 200,
                        minWidth: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                    {messagesList.map((item, index) => {
                        return <MessageBox key={item.key + index} message={item} />
                    })}

                </DialogContent>
                <DialogActions>
                    <MessageInput
                        message={message}
                        setMessage={setMessage}
                        onSubmit={handleSubmit}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
}