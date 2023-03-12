import axios from 'axios';
import { products } from '~/components/appbar/AppbarDesktop';
import { searchValue } from '~/components/search';

let productData = [];
let productSearchData = [];
const service = {
    getData: async ({ from, to }) => {
        await axios.get('http://localhost:8080/products').then((response) => {
            productData = response.data;
        });

        if (products.length !== 0) {
            productData = products;
        }
        return new Promise((resolve, reject) => {
            const data = productData.slice(from, to);

            resolve({
                count: productData.length,
                data: data,
            });
        });
    },

    getDataSearch: async ({ from, to }) => {
        await axios.get(`http://localhost:8080/product/${searchValue}`).then((response) => {
            productSearchData = response.data;
        });

        return new Promise((resolve, reject) => {
            const data = productSearchData.slice(from, to);

            resolve({
                count: productSearchData.length,
                data: data,
            });
        });
    },
};

export default service;
