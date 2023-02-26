import { Box, Typography } from '@mui/material';
import Advertisement from '~/components/advertisement';
import Banner from '~/components/banner';
import Products from '~/components/products';

function Home() {
    return (
        <>
            <Banner />
            <Advertisement />
            <Box display={'flex'} justifyContent={'center'}>
                <Typography variant="h4" sx={{ p: 4 }}>
                    Our Products
                </Typography>
            </Box>
            <Products />
        </>
    );
}

export default Home;
