import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export default function QuantityInput({ value, setValue, sx }) {
    const handleMinus = () => setValue(Math.max(1, value - 1));
    const handlePlus = () => setValue(Math.min(10, value + 1));

    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={sx}>
            <IconButton
                onClick={handleMinus}
                size="small"
                color="primary"
                sx={{ border: '1px solid', borderColor: 'primary.main', borderRadius: 2, padding: '6px' }}
                aria-label="decrease quantity"
            >
                <RemoveIcon />
            </IconButton>
            <TextField
                value={value}
                size="small"
                variant="outlined"
                sx={{
                    width: 40,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: "8px 0px", textAlign: "center"
                    }
                }}
                readOnly
            />
            <IconButton
                onClick={handlePlus}
                size="small"
                color="primary"
                sx={{ border: '1px solid', borderColor: 'primary.main', borderRadius: 2, padding: '6px' }}
                aria-label="increase quantity"
            >
                <AddIcon />
            </IconButton>
        </Stack>
    );
}