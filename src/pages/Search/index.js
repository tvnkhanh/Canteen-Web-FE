import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SingleProduct from '~/components/products/SingleProduct';
import SingleProductDesktop from '~/components/products/SingleProductDesktop';
import notFoundProduct from '~/assets/not-found-product.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { searchValue } from '~/components/search';
import SearchPagination from '~/components/pagination/SearchPagination';

export default function Search() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const [productSearch, setProductSearch] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/product/${searchValue}`).then((response) => {
            setProductSearch(response.data);
        });
    }, [productSearch]);

    const renderProducts = productSearch.map((product) => (
        <Grid item key={product.id} xs={2} sm={4} display="flex" flexDirection={'column'} alignItems={'center'}>
            {matches ? (
                <SingleProduct product={product} matches={matches} />
            ) : (
                <SingleProductDesktop product={product} matches={matches} />
            )}
        </Grid>
    ));
    return (
        <Container>
            {productSearch.length !== 0 ? (
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    justifyContent={'center'}
                    sx={{ margin: '20px 4px 10px 4px' }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {renderProducts}
                </Grid>
            ) : (
                <Box display={'flex'} alignItems="center" justifyContent={'center'}>
                    <img src={notFoundProduct} alt="Not found product" width={'80%'} />
                </Box>
            )}
            <SearchPagination
                setProducts={(p) => {
                    setProductSearch(p);
                }}
            />
        </Container>
    );
}
