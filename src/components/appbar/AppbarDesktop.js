import { Box, Link, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AppBarContainer, AppBarHeader, MyList } from '~/styles/appbar';
import SearchIcon from '@mui/icons-material/Search';
import Actions from './Actions';
import { useUIContext } from '~/context/ui';

export default function AppBarDesktop({ matches }) {
    const { setShowSearchBox } = useUIContext();

    return (
        <AppBarContainer>
            <AppBarHeader variant="h4">Canteen</AppBarHeader>
            <MyList type="row">
                <Box display="flex">
                    <Link href="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
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

                <ListItemButton onClick={() => setShowSearchBox(true)}>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                </ListItemButton>
            </MyList>

            <Actions matches={matches} />
        </AppBarContainer>
    );
}
