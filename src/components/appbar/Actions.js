import { Divider, ListItemButton, ListItemIcon } from '@mui/material';
import { ActionIconContainerDesktop, ActionIconContainerMobile, MyList } from '~/styles/appbar';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { Colors } from '~/styles/theme';

import AccountMenu from './AccountMenu';
import { Link, useNavigate } from 'react-router-dom';
import SignInSignUpBtn from './SignInSignUpBtn';
import axios from 'axios';

let orders = [];

export default function Actions({ matches }) {
    const Component = matches ? ActionIconContainerMobile : ActionIconContainerDesktop;
    const navigate = useNavigate();

    const handleSwitchCart = async () => {
        await axios.get(`http://localhost:8080/carts/${localStorage.getItem('userId')}`).then((response) => {
            orders = response.data;
        });
        navigate('/cart');
    };

    return (
        <Component>
            <MyList type="row">
                <ListItemButton sx={{ justifyContent: 'center' }} onClick={handleSwitchCart}>
                    {/* <Link to="/cart"> */}
                    <ListItemIcon
                        sx={{ display: 'flex', justifyContent: 'center', color: matches && Colors.secondary }}
                    >
                        <ShoppingCart />
                    </ListItemIcon>
                    {/* </Link> */}
                </ListItemButton>

                {/* <Divider orientation="vertical" flexItem sx={{ width: 0 }} />

                <ListItemButton sx={{ justifyContent: 'center' }}>
                    <Link to="/favorite">
                        <ListItemIcon
                            sx={{ display: 'flex', justifyContent: 'center', color: matches && Colors.secondary }}
                        >
                            <Favorite />
                        </ListItemIcon>
                    </Link>
                </ListItemButton> */}

                <Divider orientation="vertical" flexItem sx={{ width: 0 }} />

                {localStorage.getItem('userId') !== '' ? <AccountMenu /> : <SignInSignUpBtn />}

                <Divider orientation="vertical" flexItem sx={{ width: 0 }} />
            </MyList>
        </Component>
    );
}

export { orders };
