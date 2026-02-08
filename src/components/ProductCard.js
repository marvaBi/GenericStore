import React from 'react';

import { useCart } from '../contexts/CartContext';
import { useWishList } from '../contexts/WishListContext';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


import QuantityInput from './QuantityInput';


export default function ProductCard({ data }) {
    const { setCart } = useCart();
    const { setWishList } = useWishList();

    const [count, setCount] = React.useState(1);

    const handleWish = () => {
        setWishList(prev => {
            if (prev.includes(data.id)) {
                return prev;
            } else {
                return [...prev, data.id];
            }
        });
    }

    const handleShop = () => {
        setCart(prev => {
            const index = prev.findIndex(([id]) => id === data.id);
            if (index > -1) {
                return prev.map(([id, prevCount]) =>
                    id == data.id ? [id, prevCount + count] : [id, prevCount]
                );
            } else {
                return [...prev, [data.id, count]];
            }
        });
    };


    return (
        <Card sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardMedia
                component="img"
                sx={{ width: '30%', objectFit: 'contain' }}
                image={data.img}
                title="product"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%', objectFit: 'contain' }}>
                <CardContent>
                    <Stack direction="row" justifyContent='space-between' alignItems='center'>
                        <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                            {data.name}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                            {data.price}$
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "left" }}>
                        This is {data.name}. It is one of our store's products. You should buy it because it is so good!
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    <QuantityInput value={count} setValue={setCount} sx={{ mr: 1 }} />
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={handleWish}
                        sx={{ borderRadius: 2, minWidth: 40, padding: '6px' }}>
                        <FavoriteBorderIcon />
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={handleShop}
                        sx={{ borderRadius: 2, minWidth: 40, padding: '6px' }}>
                        <AddShoppingCartIcon />
                    </Button>
                </CardActions>
            </Box>
        </Card >
    );
}
