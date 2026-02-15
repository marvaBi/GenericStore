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
    const { addToCart } = useCart();
    const { addToWishList } = useWishList();

    const [count, setCount] = React.useState(1);

    const handleWish = () => {
        addToWishList(data.id);
    }

    const handleShop = () => {
        addToCart(data.id, count);
        setCount(1);
    };


    return (
        <Card sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            mb: { xs: 2, md: 0 }
        }}>
            <CardMedia
                component="img"
                sx={{
                    width: { xs: '100%', md: '30%' },
                    height: { xs: '180px', md: 'auto' },
                    objectFit: 'contain',
                    p: 1
                }}
                image={data.img}
                title="product"
            />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '100%', md: '70%' }
            }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent='space-between'
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                        spacing={{ xs: 0.5, md: 0 }}
                    >
                        <Typography variant="h5" component="div" fontWeight="bold">
                            {data.name}
                        </Typography>
                        <Typography variant="h6" component="div" fontWeight="bold">
                            {data.price}$
                        </Typography>
                    </Stack>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            textAlign: "left",
                            mt: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        This is {data.name}. It is one of our store's products. You should buy it because it is so good!
                    </Typography>
                </CardContent>

                <Divider />

                <CardActions sx={{
                    display: 'flex',
                    justifyContent: { xs: 'space-between', md: 'center' },
                    flexWrap: 'wrap',
                    gap: 1,
                    p: 2
                }}>
                    <QuantityInput value={count} setValue={setCount} />

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={handleWish}
                            sx={{
                                borderRadius: 2,
                                minWidth: 40,
                                padding: '6px'
                            }}>
                            <FavoriteBorderIcon />
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={handleShop}
                            sx={{
                                borderRadius: 2,
                                minWidth: 40,
                                padding: '6px'
                            }}>
                            <AddShoppingCartIcon />
                        </Button>
                    </Box>
                </CardActions>
            </Box>
        </Card>
    );
}
