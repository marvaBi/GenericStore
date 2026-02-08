import React from 'react';

import './App.css';
import Header from './components/Header';
import Store from './components/Store';
import Footer from './components/Footer';
import WishListPage from './components/WishListPage';
import ShoppingCartPage from './components/ShoppingCartPage';
import ChatModal from './components/ChatModal';

import { ThemeContextProvider, useThemeMode } from './contexts/ThemeContext';
import { CartContextProvider } from './contexts/CartContext';
import { WishListContextProvider } from './contexts/WishListContext';

import { useProducts } from './hooks/useProducts';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const PAGES = {
    STORE: "Store",
    WISH_LIST: "WishList",
    SHOPPING_CART: "ShoppingCart"
}

function MainAppContent({ data }) {
    const [mainPage, setMainPage] = React.useState("Store");

    const { mode } = useThemeMode();
    const theme = React.useMemo(() =>
        createTheme({
            palette: { mode: mode }
        }), [mode]);

    let page;
    switch (mainPage) {
        case PAGES.STORE:
            page = <Store data={data} />;
            break;
        case PAGES.WISH_LIST:
            page = <WishListPage data={data} />;
            break;
        case PAGES.SHOPPING_CART:
            page = <ShoppingCartPage
                data={data}
                setMainPage={setMainPage} />;
            break;

        default:
            page = <></>;
            break;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                    }}>
                    <Header setMainPage={setMainPage} />
                    <Box component="main" sx={{ flexGrow: 1 }}>
                        {page}
                    </Box>
                    <Footer />
                </Box>
                <ChatModal />
            </div >
        </ThemeProvider>
    )
}

export default function App() {
    const { data, loading, error } = useProducts();

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div>Error: Please refresh the page</div>
            </Box>
        )
    }

    return (
        <ThemeContextProvider>
            <CartContextProvider>
                <WishListContextProvider>
                    <MainAppContent data={data} />
                </WishListContextProvider>
            </CartContextProvider>
        </ThemeContextProvider>
    );
}