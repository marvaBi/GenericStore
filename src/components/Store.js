import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ProductCard from './ProductCard'

const SORTING_OPTIONS = {
    DEFAULT: "Default",
    NEW_FIRST: "New Arrivals",
    CHEAP_FIRST: "Price: Low to High",
    EXPENSIVE_FIRST: "Price: High to Low"
}


function Search({ filterBy, setFilterBy }) {
    return (
        <FormControl variant="outlined">
            <OutlinedInput
                size="small"
                placeholder="Search…"
                value={filterBy}
                onChange={event => setFilterBy(event.target.value)}
                sx={{ flexGrow: 1 }}
                startAdornment={
                    <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }}
            />
        </FormControl>
    );
}

function Sort({ orderBy, setOrderBy }) {
    return (
        <TextField
            select
            size="small"
            label="sort by"
            value={orderBy}
            onChange={event => setOrderBy(event.target.value)}
        >
            {Object.values(SORTING_OPTIONS).map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default function Store({ data, setWishList, setShoppingCart }) {
    const [orderBy, setOrderBy] = React.useState(SORTING_OPTIONS.DEFAULT);
    const [filterBy, setFilterBy] = React.useState('');

    let items = data.products;
    if (orderBy != SORTING_OPTIONS.DEFAULT) {
        switch (orderBy) {
            case SORTING_OPTIONS.NEW_FIRST:
                items = [...data.products].sort((a, b) => {
                    return new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime();
                })
                break;

            case SORTING_OPTIONS.CHEAP_FIRST:
                items = [...data.products].sort((a, b) => a.price - b.price);
                break;

            case SORTING_OPTIONS.EXPENSIVE_FIRST:
                items = [...data.products].sort((a, b) => b.price - a.price);
                break;
        }
    }


    items = [...items].filter(item =>
        item.name.toLowerCase().indexOf(filterBy.toLowerCase()) != -1
    )

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 5 }}>
            <Stack
                direction="row"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Search filterBy={filterBy} setFilterBy={setFilterBy} />
                <Sort orderBy={orderBy} setOrderBy={setOrderBy} />
            </Stack>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 3, md: 3 }}>
                {items.map((item) => (
                    <Grid key={item.id} size={{ xs: 1, sm: 1, md: 1 }}>
                        <ProductCard
                            data={item}
                            setWishList={setWishList}
                            setShoppingCart={setShoppingCart}>
                        </ProductCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}