import { Divider, ListItemButton, ListItemIcon } from '@mui/material';
import { ActionIconContainerDesktop, ActionIconContainerMobile, MyList } from '~/styles/appbar';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { Colors } from '~/styles/theme';

import AccountMenu from './AccountMenu';
import { Link } from 'react-router-dom';
import { currentUser } from '~/pages/SignIn';
import SignInSignUpBtn from './SignInSignUpBtn';

export default function Actions({ matches }) {
    const Component = matches ? ActionIconContainerMobile : ActionIconContainerDesktop;

    return (
        <Component>
            <MyList type="row">
                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <Link to="/cart">
                        <ListItemIcon
                            sx={{ display: 'flex', justifyContent: 'center', color: matches && Colors.secondary }}
                        >
                            <ShoppingCart />
                        </ListItemIcon>
                    </Link>
                </ListItemButton>

                <Divider orientation="vertical" flexItem sx={{ width: 0 }} />

                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <Link to="/favorite">
                        <ListItemIcon
                            sx={{ display: 'flex', justifyContent: 'center', color: matches && Colors.secondary }}
                        >
                            <Favorite />
                        </ListItemIcon>
                    </Link>
                </ListItemButton>

                <Divider orientation="vertical" flexItem sx={{ width: 0 }} />

                {currentUser.userId !== '' ? <AccountMenu /> : <SignInSignUpBtn />}

                <Divider orientation="vertical" flexItem sx={{ width: 0 }} />
            </MyList>
        </Component>
    );
}
