import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { AppBarContainer, AppBarHeader } from '~/styles/appbar';
import Actions from './Actions';
import { useUIContext } from '~/context/ui';

export default function AppBarMobile({ matches }) {
    const { setDrawerOpen, setShowSearchBox } = useUIContext();

    return (
        <AppBarContainer>
            <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
            <AppBarHeader textAlign={'center'} variant="h4">
                Canteen
            </AppBarHeader>
            <IconButton onClick={() => setShowSearchBox(true)}>
                <SearchIcon />
            </IconButton>
            <Actions matches={matches} />
        </AppBarContainer>
    );
}
