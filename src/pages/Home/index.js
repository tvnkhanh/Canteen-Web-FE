import { Box, Container, Typography } from '@mui/material';
import Advertisement from '~/components/advertisement';
import AppBar from '~/components/appbar';
import Banner from '~/components/banner';
import AppDrawer from '~/components/drawer';
import Footer from '~/components/footer';
import Products from '~/components/products';
import SearchBox from '~/components/search';
import { UIProvider } from '~/context/ui';

function Home() {
    return (
        <Container maxWidth="x1" sx={{ background: '#fff' }}>
            <UIProvider>
                <AppBar />
                <Banner />
                <Advertisement />
                <Box display={'flex'} justifyContent={'center'}>
                    <Typography variant="h4" sx={{ p: 4 }}>
                        Our Products
                    </Typography>
                </Box>
                <Products />
                <Footer />
                <AppDrawer />
                <SearchBox />
            </UIProvider>
        </Container>
    );
}

export default Home;
