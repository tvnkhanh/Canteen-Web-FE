import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material';
import {
    Product,
    ProductActionButton,
    ProductActionWrapper,
    ProductAddToCart,
    ProductFavoriteButton,
    ProductImage,
} from '~/styles/products';
import ProductMeta from './ProductMeta';
import { useState } from 'react';
import useDialogModel from '~/hooks/useDialogModel';
import ProductDetail from '../productdetail';
import axios from 'axios';

export default function SingleProductDesktop({ product, matches }) {
    const [showOptions, setShowOptions] = useState(false);
    const [openFail, setOpenFail] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleMouseEnter = () => {
        setShowOptions(true);
    };

    const handleMouseLeave = () => {
        setShowOptions(false);
    };

    const handleAddToCart = async () => {
        await axios
            .post(`http://localhost:8080/addtocart/${localStorage.getItem('orderId')}/${product.productId}`)
            .then((response) => {
                if (response.data === 'OK') {
                    setOpenSuccess(true);
                } else {
                    setOpenFail(true);
                }
            });
    };

    const [ProductDetailDialog, showProductDetailDialog, closeProductDetailDialog] = useDialogModel(ProductDetail);

    return (
        <>
            <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ProductImage src={product.image} />
                <ProductFavoriteButton isfav={0}>
                    <FavoriteIcon />
                </ProductFavoriteButton>

                {showOptions && (
                    <>
                        <ProductAddToCart show={showOptions} variant="contained" onClick={handleAddToCart}>
                            Add to Cart
                        </ProductAddToCart>
                    </>
                )}

                <ProductActionWrapper show={showOptions}>
                    <Stack direction="column">
                        <ProductActionButton>
                            <ShareIcon color="primary" />
                        </ProductActionButton>

                        <ProductActionButton onClick={() => showProductDetailDialog()}>
                            <FitScreenIcon color="primary" />
                        </ProductActionButton>
                    </Stack>
                </ProductActionWrapper>
            </Product>

            <ProductMeta product={product} matches={matches} />
            <ProductDetailDialog product={product} />

            <Dialog open={openFail} onClose={() => setOpenFail(false)}>
                <DialogTitle>Out of stock</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>This product is out of stock, please comeback later.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenFail(false)}>I understand</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>This product is successfully added to cart.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSuccess(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
