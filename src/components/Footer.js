import React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from '@mui/icons-material/Mail';

export default function Footer() {
    return (
        <React.Fragment>
            <Divider />
            <Box sx={{ height: 40 }}>
                <IconButton size="large" aria-label="instagram">
                    <InstagramIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" aria-label="instagram">
                    <FacebookIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" aria-label="instagram">
                    <MailIcon fontSize="inherit" />
                </IconButton>
            </Box>
        </React.Fragment>
    );
}