import { Favorite } from '@mui/icons-material';
import DefaultLayout from '~/layouts/DefaultLayout';
import Cart from '~/pages/Cart';
import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/signin', component: SignIn, layout: null },
    { path: '/signup', component: SignUp, layout: null },
    { path: '/cart', component: Cart, layout: DefaultLayout },
    { path: '/favorite', component: Favorite, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
