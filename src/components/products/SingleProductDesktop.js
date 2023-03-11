import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { Alert, Box, Collapse, IconButton, Stack } from '@mui/material';
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
import CloseIcon from '@mui/icons-material/Close';

export default function SingleProductDesktop({ product, matches }) {
    const [showOptions, setShowOptions] = useState(false);
    const [open, setOpen] = useState(false);

    const handleMouseEnter = () => {
        setShowOptions(true);
    };

    const handleMouseLeave = () => {
        setShowOptions(false);
    };

    const handleAddToCart = () => {
        axios.post(`http://localhost:8080/addtocart/1/${product.productId}`);
        setOpen(true);
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
                        <Box sx={{ width: '100%', position: 'absolute', top: 0, right: 0 }}>
                            <Collapse in={open}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    Add Success
                                </Alert>
                            </Collapse>
                        </Box>
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
        </>
    );
}
