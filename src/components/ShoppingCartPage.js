import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import QuantityInput from './QuantityInput';


function DialogRemoveItem({ open, onClose, onConfirm }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete<br />this item from your shopping cart?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function CartTable({ rows, handleQuantityChange, openDialog }) {
    return (
        <TableContainer component={Paper} sx={{ width: '60%' }}>
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                        <TableCell>Product</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Count</TableCell>
                        <TableCell align="center">Total Price</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={"shop" + row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar alt={row.name} src={row.img} />
                                    <Typography>{row.name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="center">{row.price + "$"}</TableCell>
                            <TableCell align="center">
                                <QuantityInput
                                    sx={{ display: "inline-block", margin: "auto" }}
                                    value={Number(row.count)}
                                    setValue={(newCount) => handleQuantityChange(row.id, newCount)}
                                />
                            </TableCell>
                            <TableCell align="center">{row.total + "$"}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => openDialog(row.id)}>
                                    <DeleteOutlinedIcon color="primary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function OrderSummary({ rows, handleBackShopping }) {
    const subtotal = React.useMemo(() =>
        rows.reduce((sum, row) => sum + row.price * row.count, 0), [rows]);
    const shipping = subtotal ? 30 : 0;
    const discount = Math.round(subtotal * 0.1);
    const total = subtotal + shipping - discount;

    return (
        <Stack sx={{ minWidth: 260, maxWidth: 320, p: 2, gap: 1 }}>
            <Typography variant="h6" fontWeight="bold">
                Order Summary
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography>{subtotal + "$"}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Shipping</Typography>
                <Typography>{shipping + "$"}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Typography color="secondary" sx={{ fontStyle: 'italic' }}>Discount (10%)</Typography>
                <Typography color="secondary" sx={{ fontStyle: 'italic' }}>{`-${discount}$`}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between">
                <Typography fontWeight="bold" color="primary">Total</Typography>
                <Typography fontWeight="bold" color="primary">{total + "$"}</Typography>
            </Box>

            <Stack spacing={2} sx={{ mt: 2 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    fullWidth
                    onClick={handleBackShopping}
                    sx={{ borderRadius: 2 }}
                >
                    Continue Shopping
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartCheckoutIcon />}
                    fullWidth
                    // onClick={() => {}}
                    sx={{ borderRadius: 2 }}
                >
                    Proceed to Checkout
                </Button>
            </Stack>


            <Typography variant="caption" color="text.secondary" sx={{ pt: 1 }}>
                * Delivery 2-5 business days * 14-day return
            </Typography>
        </Stack>
    )
}

function createData(id, img, name, price, count) {
    return { id, img, name, price: price, count, total: price * count };
}

export default function ShoppingCartPage({ data, shoppingCart, setShoppingCart, setMainPage }) {

    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [itemToDelete, setItemToDelete] = React.useState(null);

    const rows =
        shoppingCart.map(([id, count]) => {
            let details = data.products.find(item => item.id == id);
            return createData(id, details.img, details.name, details.price, count);
        });

    const handleQuantityChange = (id, newCount) => {
        setShoppingCart(prev =>
            prev.map(([itemId, count]) =>
                itemId == id ? [itemId, newCount] : [itemId, count]
            )
        );
    };

    const openDialog = (id) => {
        setItemToDelete(id);
        setIsDialogOpen(true);
    };
    const closeDialog = () => {
        setIsDialogOpen(false);
        setItemToDelete(null);
    };
    const confirmDelete = () => {
        if (itemToDelete !== null) {
            setShoppingCart(prev =>
                prev.filter(([id, count]) => id != itemToDelete));
        }
        closeDialog();
    };


    return (
        <>
            <DialogRemoveItem
                open={isDialogOpen}
                onClose={closeDialog}
                onConfirm={confirmDelete}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 5 }}>
                <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                    My Shopping Cart
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 10 }}>

                    <CartTable
                        rows={rows}
                        handleQuantityChange={handleQuantityChange}
                        openDialog={openDialog}
                    />

                    <OrderSummary
                        rows={rows}
                        handleBackShopping={() => { setMainPage("Store") }}
                    />

                </Box>
            </Box>
        </>
    );
}

