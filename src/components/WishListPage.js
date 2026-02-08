import React from 'react';

import { useWishList } from '../contexts/WishListContext';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import WishCard from './WishCard';

export default function WishListPage({ data }) {
    const { wishList } = useWishList();

    let items = data.products.filter(item => wishList.includes(item.id));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 5 }}>
            <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                My Wish List
            </Typography>

            {
                items.length ?
                    items.map((item) => (
                        <Box key={"wish" + item.id} sx={{ mx: 'auto' }}>
                            <WishCard data={item} />
                        </Box>
                    )) :
                    <Typography variant="h6" component="div">
                        Your wishlist is empty<br /> start adding your favorites!<br />
                        <FavoriteBorderIcon sx={{ pt: 1.5 }} />
                    </Typography>
            }
        </Box>
    );
}