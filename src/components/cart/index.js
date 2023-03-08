import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { currentUser } from '~/pages/SignIn';
// import { orders } from '~/data';
import { CartPayment, CartWrapper } from '~/styles/cart';
import { Colors } from '~/styles/theme';
import CartItem from './CartItem';

let orders = [];

export function CartComponent() {
    const [value, setValue] = useState();

    const refresh = () => {
        setValue({});
    };

    useEffect(() => {
        const id = setInterval(() => {
            console.log('trigger');
            refresh();
        }, 1000);
        return () => clearInterval(id);
    }, []);

    axios.get(`http://localhost:8080/carts/${currentUser.userId}`).then((response) => {
        orders = response.data;
    });

    const renderOrder = (orders) =>
        orders.map((order) => {
            return <CartItem order={order} key={order.id} />;
        });

    console.log(orders);
    return (
        <>
            <CartWrapper>{renderOrder(orders)}</CartWrapper>
            <CartPayment>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: Colors.secondary,
                    }}
                >
                    <Link to="/checkout" style={{ textDecoration: 'none', color: Colors.white }}>
                        Thanh toán
                    </Link>
                </Button>
            </CartPayment>
        </>
    );
}
