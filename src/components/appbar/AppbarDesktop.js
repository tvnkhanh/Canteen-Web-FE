import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
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
                <ListItemText primary="Home" />
                <ListItemText primary="Categories" />
                <ListItemText primary="Products" />
                <ListItemText primary="Contact Us" />
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
