import { Box } from '@mui/material';
import Header from '~/layout/components/Header';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Box sx={{ pl: 15, pr: 15 }}>{children}</Box>
        </div>
    );
}

export default DefaultLayout;
