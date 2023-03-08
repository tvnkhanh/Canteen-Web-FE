import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { AppBarContainer, AppBarHeader } from '~/styles/appbar';
import Actions from './Actions';
import { useUIContext } from '~/context/ui';
import { Link } from 'react-router-dom';

export default function AppBarMobile({ matches }) {
    const { setDrawerOpen, setShowSearchBox } = useUIContext();

    return (
        <AppBarContainer>
            <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: 'none', p: 4, flexGrow: 1 }}>
                <AppBarHeader textAlign={'center'} variant="h4">
                    Canteen
                </AppBarHeader>
            </Link>
            <IconButton onClick={() => setShowSearchBox(true)}>
                <SearchIcon />
            </IconButton>
            <Actions matches={matches} />
        </AppBarContainer>
    );
}
