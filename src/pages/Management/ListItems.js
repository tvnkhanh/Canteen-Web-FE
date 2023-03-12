import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import { Link, useNavigate } from 'react-router-dom';
import { Colors } from '~/styles/theme';
import axios from 'axios';

let users = [];
let orders = [];

export default function ListItems() {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Link to="/management/product" style={{ textDecoration: 'none', color: Colors.black }}>
                <ListItemButton>
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItemButton>
            </Link>
            <Link to="/management/user" style={{ textDecoration: 'none', color: Colors.black }}>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="User Account" />
                </ListItemButton>
            </Link>

            <Link to="/management/orders" style={{ textDecoration: 'none', color: Colors.black }}>
                <ListItemButton>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItemButton>
            </Link>
        </React.Fragment>
    );
}

export { users, orders };
