import { Box, Button, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AppBarContainer, AppBarHeader, MyList } from '~/styles/appbar';
import SearchIcon from '@mui/icons-material/Search';
import Actions from './Actions';
import { useUIContext } from '~/context/ui';
import { Link, useNavigate } from 'react-router-dom';
import { Colors } from '~/styles/theme';
import axios from 'axios';

let products = [];

export default function AppBarDesktop({ matches }) {
    const navigate = useNavigate();

    const { setShowSearchBox } = useUIContext();

    const handleSwitchHome = () => {
        axios.get('http://localhost:8080/products').then((response) => {
            products = response.data;
        });

        navigate('/');
    };

    return (
        <AppBarContainer>
            {/* <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexGrow: 1 }}> */}
            <Button onClick={handleSwitchHome} sx={{ textTransform: 'none' }}>
                <AppBarHeader variant="h4">Canteen</AppBarHeader>
            </Button>
            {/* </Link> */}
            <MyList type="row">
                <Box display="flex">
                    <Link
                        to="/"
                        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: Colors.black }}
                    >
                        <ListItemButton>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </Link>

                    <Link
                        to="/categories"
                        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: Colors.black }}
                    >
                        <ListItemButton>
                            <ListItemText primary="Categories" />
                        </ListItemButton>
                    </Link>

                    <ListItemButton href="#product">
                        <ListItemText primary="Products" />
                    </ListItemButton>

                    <ListItemButton sx={{ mr: 30 }} href="#contact">
                        <ListItemText primary="Contact Us" />
                    </ListItemButton>
                </Box>

                <ListItemButton sx={{ ml: 20 }} onClick={() => setShowSearchBox(true)}>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                </ListItemButton>
            </MyList>

            <Actions matches={matches} />
        </AppBarContainer>
    );
}

export { products };
