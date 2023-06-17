import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Colors } from '~/styles/theme';

export default function ListItem() {
    return (
        <React.Fragment>
            <Link to="/profile/my-orders" style={{ textDecoration: 'none', color: Colors.black }}>
                <ListItemButton>
                    <ListItemIcon>
                        <ShoppingBasketIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Orders" />
                </ListItemButton>
            </Link>
            <Link to="/profile/address" style={{ textDecoration: 'none', color: Colors.black }}>
                <ListItemButton>
                    <ListItemIcon>
                        <PlaceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Address" />
                </ListItemButton>
            </Link>
            <Link to="/profile/payment" style={{ textDecoration: 'none', color: Colors.black }}>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountBalanceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Payment Method" />
                </ListItemButton>
            </Link>
        </React.Fragment>
    );
}
