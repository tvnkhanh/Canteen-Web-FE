import axios from 'axios';
import { useState } from 'react';
import { currentUser } from '~/pages/SignIn';

let products = [];

axios.get('http://localhost:8080/products').then((response) => {
    products = response.data;
});

let orders = [];

axios.get(`http://localhost:8080/carts/25`).then((response) => {
    orders = response.data;
});

export { products, orders };
