import { Divider, Link, ListItemButton, ListItemIcon } from '@mui/material';
import { ActionIconContainerDesktop, ActionIconContainerMobile, MyList } from '~/styles/appbar';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { Colors } from '~/styles/theme';

import AccountMenu from './AccountMenu';

export default function Actions({ matches }) {
    const Component = matches ? ActionIconContainerMobile : ActionIconContainerDesktop;

    return (
        <Component>
            <MyList type="row">
                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <Link href="/cart">
                        <ListItemIcon
                            sx={{ display: 'flex', justifyContent: 'center', color: matches && Colors.secondary }}
                        >
                            <ShoppingCart />
                        </ListItemIcon>
                    </Link>
                </ListItemButton>

                <Divider orientation="vertical" flexItem sx={{ width: 0 }} />

                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <Link href="/favorite">
                        <ListItemIcon
                            sx={{ display: 'flex', justifyContent: 'center', color: matches && Colors.secondary }}
                        >
                            <Favorite />
                        </ListItemIcon>
                    </Link>
                </ListItemButton>

                <Divider orientation="vertical" flexItem sx={{ width: 0 }} />

                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <AccountMenu />
                </ListItemButton>

                <Divider orientation="vertical" flexItem sx={{ width: 0 }} />
            </MyList>
        </Component>
    );
}
