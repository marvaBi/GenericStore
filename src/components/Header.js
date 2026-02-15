import React from 'react';

import { useCart } from '../contexts/CartContext';
import { useWishList } from '../contexts/WishListContext';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useThemeMode } from '../contexts/ThemeContext';


export default function Header({ setMainPage }) {
    const { mode, toggleMode } = useThemeMode();
    const { cart } = useCart();
    const { wishList } = useWishList();

    const handleWishClick = () => { setMainPage("WishList") }
    const handleCartClick = () => { setMainPage("ShoppingCart") }
    const handleStoreClick = () => { setMainPage("Store") }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleStoreClick}
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                    >
                        MY STORE
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex' }}>
                        <IconButton
                            size="large"
                            aria-label="show 4 new mails"
                            color="inherit"
                            onClick={handleWishClick}>
                            <Badge badgeContent={wishList.length} color="secondary"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}>
                                <FavoriteIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={handleCartClick}>
                            <Badge badgeContent={cart.length} color="secondary"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}>
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={toggleMode}
                        >
                            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
    );
}