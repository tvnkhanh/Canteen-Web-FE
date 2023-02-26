import { Divider, ListItemButton, ListItemIcon } from '@mui/material';
import { ActionIconContainerDesktop, ActionIconContainerMobile, MyList } from '~/styles/appbar';
import { Favorite, Person, ShoppingCart } from '@mui/icons-material';
import { Colors } from '~/styles/theme';

export default function Actions({ matches }) {
    const Component = matches ? ActionIconContainerMobile : ActionIconContainerDesktop;

    return (
        <Component>
            <MyList type="row">
                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <ListItemIcon
                        sx={{ display: 'flex', justifyContent: 'center', color: matches && Colors.secondary }}
                    >
                        <ShoppingCart />
                    </ListItemIcon>
                </ListItemButton>

                <Divider orientation="vertical" flexItem sx={{ width: 0 }} />

                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <ListItemIcon
                        sx={{ display: 'flex', justifyContent: 'center', color: matches && Colors.secondary }}
                    >
                        <Favorite />
                    </ListItemIcon>
                </ListItemButton>

                <Divider orientation="vertical" flexItem sx={{ width: 0 }} />

                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <ListItemIcon
                        sx={{ display: 'flex', justifyContent: 'center', color: matches && Colors.secondary }}
                    >
                        <Person />
                    </ListItemIcon>
                </ListItemButton>

                <Divider orientation="vertical" flexItem sx={{ width: 0 }} />
            </MyList>
        </Component>
    );
}
