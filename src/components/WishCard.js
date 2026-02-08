import { useCart } from '../contexts/CartContext';
import { useWishList } from '../contexts/WishListContext';


import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function WishCard({ data }) {
    const { addToCart } = useCart();
    const { removeFromWishList } = useWishList();

    const handleRemove = () => {
        removeFromWishList(data.id);
    }

    const handleAddToCart = () => {
        addToCart(data.id, 1);
    }

    return (
        <Card sx={{ display: 'flex', flexDirection: 'row', maxWidth: 400 }}>
            <CardMedia
                component="img"
                sx={{ width: '50%', objectFit: 'contain' }}
                image={data.img}
                title="product"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', objectFit: 'contain' }}>
                <CardContent sx={{ pb: 0 }}>
                    <Stack direction="column">
                        <Typography gutterBottom variant="h5"
                            component="div"
                            fontWeight="bold"
                            sx={{ textAlign: 'left' }}>
                            {data.name}
                        </Typography>
                        <Typography gutterBottom variant="h6"
                            component="div"
                            fontWeight="bold"
                            sx={{ textAlign: 'left' }}>
                            {data.price}$
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions sx={{ pb: 2 }}>
                    <Stack direction="column" spacing={1}>
                        <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={handleRemove}
                            sx={{
                                borderRadius: 2, minWidth: 40, padding: '6px',
                                justifyContent: 'flex-start', pl: 1.2
                            }}
                            startIcon={<DeleteOutlineIcon />}
                        >
                            Remove From List
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={handleAddToCart}
                            sx={{
                                borderRadius: 2, minWidth: 40, padding: '6px',
                                justifyContent: 'flex-start', pl: 1.5
                            }}
                            startIcon={<AddShoppingCartIcon />}
                        >
                            Add To Cart
                        </Button>
                    </Stack>
                </CardActions>
            </Box>
        </Card >
    );
}
