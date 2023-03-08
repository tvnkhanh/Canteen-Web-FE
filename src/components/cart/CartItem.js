import { Box, Button } from '@mui/material';
import InDec from '../ui';
import { CartItemWrapper, ProductCartName, ProductCartPrice, ProductInCartImage } from '~/styles/cart';
import { useState } from 'react';
import axios from 'axios';

export default function CartItem({ order }) {
    const [value, setValue] = useState();

    const refresh = () => {
        setValue({});
    };

    const handleDelete = () => {
        axios.post(`http://localhost:8080/cart/delete/${order.orderId}/${order.productId}`);
    };

    return (
        <CartItemWrapper>
            <ProductInCartImage src={order.image} />
            <ProductCartName ml={10} mr={10}>
                {order.name}
            </ProductCartName>
            <ProductCartPrice mr={14}>{order.price}</ProductCartPrice>
            <Box display="flex" alignItems="center" mr={14}>
                <InDec refresh={refresh} order={order} />
            </Box>
            <ProductCartPrice mr={18}>{order.price * order.quantity}</ProductCartPrice>
            <Button onClick={handleDelete}>Xóa</Button>
        </CartItemWrapper>
    );
}
