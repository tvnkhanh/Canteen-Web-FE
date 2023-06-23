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
import useDialogModel from '~/hooks/useDialogModel';
import ProductDetail from '../productdetail';
import axios from 'axios';
import { useState } from 'react';

export default function SingleProduct({ product, matches }) {
    const [ProductDetailDialog, showProductDetailDialog, closeProductDetailDialog] = useDialogModel(ProductDetail);
    const [openFail, setOpenFail] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

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

    return (
        <>
            <Product>
                <ProductImage src={product.image} />
                <ProductMeta product={product} matches={matches} />
                <ProductActionWrapper>
                    <Stack direction="row">
                        <ProductFavoriteButton isfav={0}>
                            <FavoriteIcon />
                        </ProductFavoriteButton>

                        <ProductActionButton>
                            <ShareIcon />
                        </ProductActionButton>

                        <ProductActionButton onClick={() => showProductDetailDialog()}>
                            <FitScreenIcon />
                        </ProductActionButton>
                    </Stack>
                </ProductActionWrapper>
            </Product>

            <ProductAddToCart variant="contained" onClick={handleAddToCart}>
                Add to cart
            </ProductAddToCart>

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
