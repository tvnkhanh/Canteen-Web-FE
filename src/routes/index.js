import Checkout from '~/components/checkout/Checkout';
import DefaultLayout from '~/layouts/DefaultLayout';
import ProfileLayout from '~/layouts/ProfileLayout';
import Cart from '~/pages/Cart';
import Favorite from '~/pages/Favorite';
import Home from '~/pages/Home';
import OrderManagement from '~/pages/Management/OrderManagement';
import ProductManagement from '~/pages/Management/ProductManagement';
import UserManagement from '~/pages/Management/UserManagement';
import AddressEdit from '~/pages/Profile/AddressEdit';
import PaymentMethodEdit from '~/pages/Profile/PaymentMethodEdit';
import Search from '~/pages/Search';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/signin', component: SignIn, layout: null },
    { path: '/signup', component: SignUp, layout: null },
    { path: '/cart', component: Cart, layout: DefaultLayout },
    { path: '/favorite', component: Favorite, layout: DefaultLayout },
    { path: '/checkout', component: Checkout, layout: DefaultLayout },
    { path: '/management/product', component: ProductManagement, layout: DefaultLayout },
    { path: '/management/user', component: UserManagement, layout: DefaultLayout },
    { path: '/management/orders', component: OrderManagement, layout: DefaultLayout },
    { path: '/search', component: Search, layout: DefaultLayout },
    { path: '/profile/address', component: AddressEdit, layout: DefaultLayout },
    { path: '/profile/payment', component: PaymentMethodEdit, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
