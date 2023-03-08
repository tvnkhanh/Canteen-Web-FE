import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Colors } from '../theme';

export const CartWrapper = styled(Box)(() => ({
    width: '100%',
    background: Colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
}));

export const CartItemWrapper = styled(Box)(() => ({
    padding: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
}));

export const ProductInCartImage = styled('img')((src) => ({
    src: `url(${src})`,
    width: '150px',
    objectFit: 'contain',
    background: Colors.white,
    padding: '2px',
}));

export const ProductCartName = styled(Typography)(() => ({
    display: 'flex',
    alignItems: 'center',
    width: '600px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
}));

export const ProductCartPrice = styled(Typography)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '150px',
}));

export const CartPayment = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '50px',
}));
