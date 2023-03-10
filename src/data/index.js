import axios from 'axios';
import { useState } from 'react';
import { currentUser } from '~/pages/SignIn';

let products = [];

axios.get('http://localhost:8080/products').then((response) => {
    products = response.data;
});

export { products };
