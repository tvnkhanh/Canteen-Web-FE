import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Title from '~/pages/Management/Title';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

let data = [];
let item1 = {};

export default function PaymentMethod() {
    // const [data, setData] = useState([]);
    const [orders, setOrders] = useState([]);
    const [openCancel, setOpenCancel] = useState(false);
    const [openNotify, setOpenNotify] = useState(false);
    const [openSuccessCancel, setOpenSuccessCancel] = useState(false);
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    const handleCloseCancel = () => {
        setOpenCancel(false);
    };

    const handleCloseNotify = () => {
        setOpenNotify(false);
    };

    const handleCloseSuccessCancel = () => {
        setOpenSuccessCancel(false);
    };

    function getData() {
        axios.get(`http://localhost:8080/get-my-orders/${localStorage.getItem('userId')}`).then((response) => {
            setOrders(response.data);
        });
    }

    let promise = new Promise((resolve, reject) => {
        let originArray = [];

        orders.map((item, index) => {
            if (originArray.some((e) => e.orderId === item.orderId)) {
                const i = originArray.findIndex((e) => e.orderId === item.orderId);

                originArray[i].name.push(item.name);
                originArray[i].image.push(item.image);
                originArray[i].quantity.push(item.quantity);
                originArray[i].description.push(item.description);
                originArray[i].price.push(item.price);
            } else {
                let result = {
                    userId: '',
                    orderId: '',
                    status: '',
                    deliveryId: '',
                    paymentId: '',
                    name: [],
                    image: [],
                    quantity: [],
                    description: [],
                    price: [],
                };

                result.userId = item.userId;
                result.orderId = item.orderId;
                result.status = item.status;
                result.deliveryId = item.deliveryId;
                result.paymentId = item.paymentId;
                result.name.push(item.name);
                result.image.push(item.image);
                result.quantity.push(item.quantity);
                result.description.push(item.description);
                result.price.push(item.price);

                originArray.push(result);
            }
        });

        if (originArray.length > 0) {
            resolve(originArray);
        } else {
            reject('Error');
        }
    });

    promise
        .then(function (result) {
            data = result;
            // setData(result);
        })
        .catch(function (err) {
            console.log(err);
        });

    useEffect(() => {
        getData();
    }, []);
    console.log(1);

    const handleCancel = async () => {
        await axios.post('http://localhost:8080/cancel-order', {
            orderId: item1.orderId,
            status: item1.status,
            userId: localStorage.getItem('userId'),
            paymentId: item1.paymentId,
            deliveryId: item1.deliveryId,
        });

        setOpenCancel(false);
        setOpenSuccessCancel(true);
        getData();
    };

    return (
        <React.Fragment>
            <Box display={'flex'} alignItems="center" justifyContent={'space-between'}>
                <Title>My Orders</Title>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Cancel</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.slice(pg * rpg, pg * rpg + rpg).map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                {item.name.map((prdname, i) => (
                                    <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src={item.image[i]}
                                            alt="product-img"
                                            style={{ height: 80, width: 80, objectFit: 'contain', marginRight: 10 }}
                                        />
                                        <Box>
                                            <Typography>{prdname}</Typography>
                                            <Typography>x{item.quantity[i]}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </TableCell>
                            <TableCell>{item.status}</TableCell>

                            <TableCell align="center">
                                <Button
                                    onClick={() => {
                                        if (item.status === 'ORDER') {
                                            setOpenCancel(true);
                                        } else {
                                            setOpenNotify(true);
                                        }
                                        item1 = {
                                            orderId: item.orderId,
                                            status: item.status,
                                            paymentId: item.paymentId,
                                            deliveryId: item.deliveryId,
                                        };
                                    }}
                                >
                                    <DeleteIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openCancel} onClose={handleCloseCancel}>
                <DialogTitle>Cancel Order</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>Are you sure cancel this order?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Yes</Button>
                    <Button onClick={handleCloseCancel}>No</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openNotify} onClose={handleCloseNotify}>
                <DialogTitle>Cancel Order</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>You can not cancel this order.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNotify}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openSuccessCancel} onClose={handleCloseSuccessCancel}>
                <DialogTitle>Cancel Order</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>You have successfully canceled your order.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessCancel}>Close</Button>
                </DialogActions>
            </Dialog>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </React.Fragment>
    );
}
