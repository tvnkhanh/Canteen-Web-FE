import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { Stack } from '@mui/material';
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

export default function SingleProduct({ product, matches }) {
    const [ProductDetailDialog, showProductDetailDialog, closeProductDetailDialog] = useDialogModel(ProductDetail);

    const handleAddToCart = () => {
        axios.post(`http://localhost:8080/addtocart/1/${product.productId}`);
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
        </>
    );
}
