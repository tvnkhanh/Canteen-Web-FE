import { Container } from '@mui/system';
import AppBar from '~/components/appbar';
import AppDrawer from '~/components/drawer';
import Footer from '~/components/footer';
import SearchBox from '~/components/search';
import { UIProvider } from '~/context/ui';

export default function DefaultLayout({ children }) {
    return (
        <Container maxWidth="x1" sx={{ background: '#fff' }}>
            <UIProvider>
                <AppBar />
                {children}
                <Footer />
                <AppDrawer />
                <SearchBox />
            </UIProvider>
        </Container>
    );
}
