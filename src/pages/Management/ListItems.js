import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { Link, useNavigate } from 'react-router-dom';
import { Colors } from '~/styles/theme';
import axios from 'axios';

let users = [];

export default function ListItems() {
    const navigate = useNavigate();
    const handleSwitchUser = async () => {
        await axios.get(`http://localhost:8080/users/USER`).then((response) => {
            users = response.data;
        });

        navigate('/management/user');
    };

    return (
        <React.Fragment>
            <Link to="/management/product" style={{ textDecoration: 'none', color: Colors.black }}>
                <ListItemButton>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItemButton>
            </Link>
            {/* <Link to="/management/user" style={{ textDecoration: 'none', color: Colors.black }}> */}
            <ListItemButton onClick={handleSwitchUser}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="User Account" />
            </ListItemButton>
            {/* </Link> */}
        </React.Fragment>
    );
}

export { users };
