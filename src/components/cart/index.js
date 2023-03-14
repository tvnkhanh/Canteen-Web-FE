import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartPayment, CartWrapper } from '~/styles/cart';
import { Colors } from '~/styles/theme';
import CartItem from './CartItem';
import EmptyCart from '~/assets/empty-cart.png';
import axios from 'axios';

let data = [];
let orderData = [];

function createData(
    orderId,
    productId,
    quantity,
    status,
    name,
    price,
    inStock,
    image,
    description,
    deliveryId,
    paymentId,
) {
    return { orderId, productId, quantity, status, name, price, inStock, image, description, deliveryId, paymentId };
}

export function CartComponent() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let temp = {};
        axios
            .get(`http://localhost:8080/orders-info/PENDING/${localStorage.getItem('userId')}`)
            .then(async (response) => {
                if (response.data.userId !== 0) {
                    temp = response.data;
                    localStorage.setItem('orderId', temp.orderId);
                    await axios
                        .get(`http://localhost:8080/carts/${localStorage.getItem('userId')}`)
                        .then((response) => {
                            setOrders(response.data);
                        });
                } else {
                    await axios.post('http://localhost:8080/init-delivery', {}).then(async (response) => {
                        await axios
                            .post('http://localhost:8080/new-order', {
                                status: 'PENDING',
                                userId: localStorage.getItem('userId'),
                                paymentId: 2,
                            })
                            .then(async (response) => {
                                await axios
                                    .get(`http://localhost:8080/carts/${localStorage.getItem('userId')}`)
                                    .then((response) => {
                                        setOrders(response.data);
                                    });
                            });
                    });
                }
            });
    }, [orders]);

    orderData = orders;

    let total = 0;
    orders.map((product) => {
        total += product.price * product.quantity;
    });

    if (orders.length !== 0) {
        localStorage.setItem('orderId', orders[0].orderId);
    }
    if (data.length === 0) {
        orders.map((order) => {
            data.push(
                createData(
                    order.orderId,
                    order.productId,
                    order.status,
                    order.name,
                    order.price,
                    order.quantity,
                    order.image,
                    order.description,
                    order.inStock,
                    order.deliveryId,
                    order.paymentId,
                ),
            );
        });
    } else {
        data = [];
        orders.map((order) => {
            data.push(
                createData(
                    order.orderId,
                    order.productId,
                    order.status,
                    order.name,
                    order.price,
                    order.quantity,
                    order.image,
                    order.description,
                    order.inStock,
                    order.deliveryId,
                    order.paymentId,
                ),
            );
        });
    }

    const renderOrder = (data) =>
        data.map((orderItem) => {
            return <CartItem order={orderItem} key={orderItem.id} />;
        });

    return (
        <>
            {data.length !== 0 ? (
                <>
                    <CartWrapper>{renderOrder(orders)}</CartWrapper>
                    <CartPayment>
                        <Typography mr={6}>Total price: {total} đ</Typography>
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
            ) : (
                <Box display={'flex'} alignItems="center" justifyContent="center">
                    <img src={EmptyCart} alt="empty-cart" />
                </Box>
            )}
        </>
    );
}

export { orderData };
