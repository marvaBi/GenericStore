import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function MessageBox({ message }) {

    const fontColor = message.isSentByUser ? 'white' : 'black';

    let paperStyle = {
        width: '80%',
        px: 1, pt: 1,
        bgcolor: message.isSentByUser ? 'primary.main' : 'white',
        borderRadius: message.isSentByUser ? '8px 0px 8px 8px' : '0px 8px 8px 8px'
    }
    message.isSentByUser ? paperStyle.ml = 'auto' : paperStyle.mr = 'auto';

    return (
        <Stack direction="row" spacing={0} width='100%'>
            {message.isSentByUser ? <></> : <AccountCircleIcon fontSize="large" sx={{pr:1.5}}/>}
            <Paper sx={paperStyle} >
                <Typography sx={{ color: fontColor }}>
                    {message.content}
                </Typography>
                <Typography variant='caption' align='right' sx={{ color: fontColor, display: 'block', width: '100%' }}>
                    {message.time}
                </Typography>
            </Paper>
        </Stack>
    );
}
