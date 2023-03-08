import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Slide, Typography } from '@mui/material';
import { Colors } from '~/styles/theme';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { ProductDetailInfoWrapper, ProductDetailWrapper } from '~/styles/productdetail';
import { Product, ProductImage } from '~/styles/products';
import InDec from '../ui';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import React from 'react';
import axios from 'axios';

const SlideTransition = React.forwardRef((props, ref) => <Slide direction="down" {...props} ref={ref} />);

export default function ProductDetail({ open, onClose, product }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const handleAddToCart = () => {
        axios.post(`http://localhost:8080/addtocart/1/${product.productId}`);
    };

    return (
        <Dialog TransitionComponent={SlideTransition} variant="permanent" open={open} fullScreen>
            <DialogTitle
                sx={{
                    background: Colors.secondary,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {product.name}
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <ProductDetailWrapper flexDirection={matches ? 'column' : 'row'}>
                    <Product sx={{ mr: 4 }}>
                        <ProductImage src={product.image} />
                    </Product>
                    <ProductDetailInfoWrapper>
                        <Typography variant="subtitle">SKU: {product.productId}</Typography>
                        <Typography variant="subtitle">Availability: {product.quantity} in stock</Typography>
                        <Typography sx={{ lineHeight: 2 }} variant="h4">
                            {product.name}
                        </Typography>
                        <Typography variant="body">{product.description}</Typography>
                    </ProductDetailInfoWrapper>
                </ProductDetailWrapper>

                <Box sx={{ mt: 4 }} display="flex" alignItems="center" justifyContent="space-between">
                    <InDec />
                    <Button variant="contained" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </Box>
                <Box display="flex" alignItems="center" sx={{ mt: 4, color: Colors.light }}>
                    <FavoriteIcon sx={{ mr: 2 }} />
                    Add to wishlist
                </Box>
                <Box
                    sx={{
                        mt: 4,
                        color: Colors.dove_gray,
                    }}
                >
                    <FacebookIcon />
                    <TwitterIcon sx={{ pl: 2 }} />
                    <InstagramIcon sx={{ pl: 2 }} />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
