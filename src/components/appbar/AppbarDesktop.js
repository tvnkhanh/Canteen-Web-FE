import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AppBarContainer, AppBarHeader, MyList } from '~/styles/appbar';
import SearchIcon from '@mui/icons-material/Search';
import Actions from './Actions';
import { useUIContext } from '~/context/ui';
import { Link } from 'react-router-dom';
import { Colors } from '~/styles/theme';

export default function AppBarDesktop({ matches }) {
    const { setShowSearchBox } = useUIContext();

    return (
        <AppBarContainer>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <AppBarHeader variant="h4">Canteen</AppBarHeader>
            </Link>
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

                    <ListItemButton>
                        <ListItemText primary="Categories" />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemText primary="Products" />
                    </ListItemButton>

                    <ListItemButton>
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
