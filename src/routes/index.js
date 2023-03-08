import Checkout from '~/components/checkout/Checkout';
import DefaultLayout from '~/layouts/DefaultLayout';
import ProfileLayout from '~/layouts/ProfileLayout';
import Cart from '~/pages/Cart';
import Favorite from '~/pages/Favorite';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/signin', component: SignIn, layout: null },
    { path: '/signup', component: SignUp, layout: null },
    { path: '/cart', component: Cart, layout: DefaultLayout },
    { path: '/favorite', component: Favorite, layout: DefaultLayout },
    { path: '/checkout', component: Checkout, layout: DefaultLayout },
    { path: '/profile', component: Profile, layout: ProfileLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
