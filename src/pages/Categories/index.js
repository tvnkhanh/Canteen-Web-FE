import { Box, Chip, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SingleProduct from '~/components/products/SingleProduct';
import SingleProductDesktop from '~/components/products/SingleProductDesktop';
import notFoundProduct from '~/assets/not-found-product.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { searchValue } from '~/components/search';
import SearchPagination from '~/components/pagination/SearchPagination';
import { Colors } from '~/styles/theme';
import { padding } from 'polished';
import FilterPagination from '~/components/pagination/FilterPagination';

let filterData = {};

export default function Categories() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const [productFilter, setProductFilter] = useState([]);
    const [categories, setCategories] = useState([]);

    const getInitData = async () => {
        await axios.get(`http://localhost:8080/products`).then((response) => {
            setProductFilter(response.data);
        });
    };

    const getCategories = async () => {
        await axios.get('http://localhost:8080/get-categories').then((response) => {
            setCategories(response.data);
        });
    };

    const handleFilter = async (category) => {
        await axios.get(`http://localhost:8080/get-category/${category.categoryId}`).then((response) => {
            setProductFilter(response.data);
        });
    };

    useEffect(() => {
        getInitData();
        getCategories();
    }, []);

    const renderProducts = productFilter.map((product) => (
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
            {categories.map((category, index) => (
                <Chip
                    key={index}
                    label={category.title}
                    sx={{ mr: 2, mb: 2 }}
                    onClick={() => {
                        handleFilter(category);
                        filterData = category;
                    }}
                    color="secondary"
                />
            ))}
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                justifyContent={'center'}
                sx={{ margin: '20px 4px 10px 4px' }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {renderProducts}
            </Grid>

            <FilterPagination
                setProducts={(p) => {
                    setProductFilter(p);
                }}
            />
        </Container>
    );
}

export { filterData };
