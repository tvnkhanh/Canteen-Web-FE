import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        let temp = {};
        axios
            .get(`http://localhost:8080/orders-info/PENDING/${localStorage.getItem('userId')}`)
            .then(async (response) => {
                temp = response.data;
                localStorage.setItem('orderId', temp.orderId);
                await axios
                    .get(`http://localhost:8080/carts/${localStorage.getItem('userId')}`)
                    .then(async (response) => {
                        if (temp.status === 'PENDING') {
                            setProducts(response.data);
                        } else {
                            await axios.post('http://localhost:8080/init-delivery', {}).then(async (response) => {
                                await axios
                                    .post('http://localhost:8080/new-order', {
                                        status: 'PENDING',
                                        userId: localStorage.getItem('userId'),
                                        paymentId: 2,
                                    })
                                    .then(async (response) => {
                                        await axios
                                            .get(`http://localhost:8080/carts/${localStorage.getItem('userId')}`)
                                            .then((response) => {
                                                setProducts(response.data);
                                            });
                                    });
                            });
                        }
                    });
            });
    }, [products]);

    let total = 0;
    products.map((product) => {
        total += product.price * product.quantity;
    });

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText
                            primary={product.name}
                            secondary={
                                product.description.length < 30
                                    ? product.description
                                    : product.description.substr(0, 30) + '...'
                            }
                        />
                        <Typography variant="body2">{product.price * product.quantity}đ</Typography>
                    </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {total}đ
                    </Typography>
                </ListItem>
            </List>
            {/* <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid> */}
        </React.Fragment>
    );
}
