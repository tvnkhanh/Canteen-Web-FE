import { Divider, ListItemButton, ListItemIcon } from '@mui/material';
import { ActionIconContainerDesktop, ActionIconContainerMobile, MyList } from '~/styles/appbar';
import { ShoppingCart } from '@mui/icons-material';
import { Colors } from '~/styles/theme';

import AccountMenu from './AccountMenu';
import { Link } from 'react-router-dom';
import SignInSignUpBtn from './SignInSignUpBtn';

export default function Actions({ matches }) {
    const Component = matches ? ActionIconContainerMobile : ActionIconContainerDesktop;

    // const handleSwitchCart = async() => {
    //     await axios
    //         .get(`http://localhost:8080/orders-info/PENDING/${localStorage.getItem('userId')}`)
    //         .then(async (response) => {
    //             temp = response.data;
    //             localStorage.setItem('orderId', temp.orderId);
    //             console.log(temp);
    //             await axios
    //                 .get(`http://localhost:8080/carts/${localStorage.getItem('userId')}`)
    //                 .then(async (response) => {
    //                     if (temp.status === 'PENDING') {
    //                         orders = response.data;
    //                         console.log(response.data);
    //                     } else {
    //
    //                             await axios
    //                                 .post('http://localhost:8080/new-order', {
    //                                     status: 'PENDING',
    //                                     userId: localStorage.getItem('userId'),
    //                                     paymentId: 2,
    //                                 })
    //                                 .then(async (response) => {
    //                                     await axios
    //                                         .get(`http://localhost:8080/carts/${localStorage.getItem('userId')}`)
    //                                         .then((response) => {
    //                                             orders = response.data;
    //                                         });
    //                                 });
    //
    //                     }
    //                 });
    //         });

    //     navigate('/cart');
    // };

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
