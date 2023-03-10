import { Button } from '@mui/material';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartPayment, CartWrapper } from '~/styles/cart';
import { Colors } from '~/styles/theme';
import CartItem from './CartItem';
import { orders } from '../appbar/Actions';

const data = [];

function createData(orderId, productId, quantity, date, name, price, inStock, image, description) {
    return { orderId, productId, quantity, date, name, price, inStock, image, description };
}

export function CartComponent() {
    const [value, setValue] = useState();

    const refresh = () => {
        setValue({});
    };

    useMemo(() => refresh(), []);

    if (data.length === 0) {
        orders.map((order) => {
            data.push(
                createData(
                    order.orderId,
                    order.productId,
                    order.date,
                    order.name,
                    order.price,
                    order.quantity,
                    order.image,
                    order.description,
                    order.inStock,
                ),
            );
        });
    }

    const renderOrder = (data) =>
        orders.map((orderItem) => {
            return <CartItem order={orderItem} key={orderItem.id} />;
        });

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
