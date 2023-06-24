import axios from 'axios';
import { products } from '~/components/appbar/AppbarDesktop';
import { searchValue } from '~/components/search';
import { filterData } from '~/pages/Categories';

let productData = [];
let productSearchData = [];
let productFilterData = [];
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

    getDataFilter: async ({ from, to }) => {
        await axios.get(`http://localhost:8080/get-category/${filterData.categoryId}`).then((response) => {
            productFilterData = response.data;
        });

        return new Promise((resolve, reject) => {
            const data = productFilterData.slice(from, to);

            resolve({
                count: productFilterData.length,
                data: data,
            });
        });
    },
};

export default service;
