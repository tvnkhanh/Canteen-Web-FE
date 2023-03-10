import { Box, Button } from '@mui/material';
import InDec from '../ui';
import { CartItemWrapper, ProductCartName, ProductCartPrice, ProductInCartImage } from '~/styles/cart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CartItem({ order }) {
    const [value, setValue] = useState();

    const refresh = () => {
        setValue({});
    };

    const navigate = useNavigate();
    const handleDelete = async () => {
        await axios.post(`http://localhost:8080/cart/delete/${order.orderId}/${order.productId}`);
        navigate('/cart');
    };

    return (
        <CartItemWrapper>
            <ProductInCartImage src={order.image} />
            <ProductCartName ml={10} mr={10}>
                {order.name}
            </ProductCartName>
            <ProductCartPrice mr={14}>{order.price}</ProductCartPrice>
            <Box display="flex" alignItems="center" mr={14}>
                <InDec order={order} />
            </Box>
            <ProductCartPrice mr={18}>{order.price * order.quantity}</ProductCartPrice>
            <Button onClick={handleDelete}>Xóa</Button>
        </CartItemWrapper>
    );
}
