import {
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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
// import { orders } from './ListItems';
import Title from './Title';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import axios from 'axios';

let data = [];
let item1 = {};
let item2 = {};
let item3 = {};

function createData(
    userId,
    orderId,
    deliveryId,
    paymentId,
    status,
    paymentMethod,
    address,
    orderTime,
    startTime,
    arrival,
) {
    return {
        userId,
        orderId,
        deliveryId,
        paymentId,
        status,
        paymentMethod,
        address,
        orderTime,
        startTime,
        arrival,
    };
}

export default function OrderManager() {
    const [openGet, setOpenGet] = useState();
    const [openDone, setOpenDone] = useState();
    const [openCancel, setOpenCancel] = useState();
    const [openCancelNotify, setOpenCancelNotify] = useState();
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    const [orders, setOrders] = useState([]);

    function getData() {
        axios.get('http://localhost:8080/orders-info').then((response) => {
            setOrders(response.data);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const handleCancelOrder = async () => {
        if (item3.status === 'ORDER' || item3.status === 'RECEIVED') {
            await axios.post('http://localhost:8080/cancel-order', {
                orderId: item3.orderId,
                status: item3.status,
                userId: localStorage.getItem('userId'),
                paymentId: item3.paymentId,
                deliveryId: item3.deliveryId,
            });
        } else {
            setOpenCancelNotify(true);
        }

        setOpenCancel(false);
        getData();
    };

    const handleGetOrder = async () => {
        await axios.post('http://localhost:8080/get-order', {
            orderId: item1.orderId,
            status: item1.status,
            userId: localStorage.getItem('userId'),
            paymentId: item1.paymentId,
            deliveryId: item1.deliveryId,
        });

        await axios.post('http://localhost:8080/set-time', {
            deliveryId: item1.deliveryId,
            address: item1.address,
            departureTime: item1.departureTime,
            arrival: item1.arrival,
        });

        setOpenGet(false);
        getData();
    };

    const handleDoneOrder = async () => {
        await axios.post('http://localhost:8080/done-order', {
            orderId: item2.orderId,
            status: item2.status,
            userId: localStorage.getItem('userId'),
            paymentId: item2.paymentId,
            deliveryId: item2.deliveryId,
        });

        await axios.post('http://localhost:8080/set-arrival-time', {
            deliveryId: item2.deliveryId,
            address: item2.address,
            departureTime: item2.departureTime,
            arrival: item2.arrival,
        });

        setOpenDone(false);
        getData();
    };

    if (data.length === 0) {
        orders.map((order) => {
            data.push(
                createData(
                    order.userId,
                    order.orderId,
                    order.deliveryId,
                    order.paymentId,
                    order.status,
                    order.paymentMethod,
                    order.address,
                    order.orderTime,
                    order.startTime,
                    order.arrival,
                ),
            );
        });
    } else {
        data = [];
        orders.map((order) => {
            data.push(
                createData(
                    order.userId,
                    order.orderId,
                    order.deliveryId,
                    order.paymentId,
                    order.status,
                    order.paymentMethod,
                    order.address,
                    order.orderTime,
                    order.startTime,
                    order.arrival,
                ),
            );
        });
    }

    return (
        <React.Fragment>
            <Title>Orders</Title>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell align="center">Order Time</TableCell>
                        <TableCell align="center">Start Time</TableCell>
                        <TableCell align="center">Arrival</TableCell>
                        <TableCell align="center">Cancel</TableCell>
                        <TableCell align="center">Get Order</TableCell>
                        <TableCell align="center">Marked As Done</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(pg * rpg, pg * rpg + rpg).map((item) => (
                        <TableRow key={item.orderId}>
                            <TableCell>{item.orderId}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.paymentMethod}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell align="center">{item.orderTime}</TableCell>
                            <TableCell align="center">{item.startTime}</TableCell>
                            <TableCell align="center">{item.arrival}</TableCell>
                            <TableCell align="center">
                                <Button
                                    onClick={() => {
                                        setOpenCancel(true);
                                        item3 = {
                                            orderId: item.orderId,
                                            status: item.status,
                                            paymentId: item.paymentId,
                                            deliveryId: item.deliveryId,
                                            startTime: item.startTime,
                                            arrivalTime: item.arrivalTime,
                                        };
                                    }}
                                >
                                    <DeleteIcon />
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    onClick={() => {
                                        setOpenGet(true);
                                        item1 = {
                                            orderId: item.orderId,
                                            status: item.status,
                                            paymentId: item.paymentId,
                                            deliveryId: item.deliveryId,
                                            startTime: item.startTime,
                                            arrivalTime: item.arrivalTime,
                                        };
                                    }}
                                >
                                    <GetAppIcon />
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    onClick={() => {
                                        setOpenDone(true);
                                        item2 = {
                                            orderId: item.orderId,
                                            status: item.status,
                                            paymentId: item.paymentId,
                                            deliveryId: item.deliveryId,
                                            startTime: item.startTime,
                                            arrivalTime: item.arrivalTime,
                                        };
                                    }}
                                >
                                    <CheckCircleIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={openCancel} onClose={() => setOpenCancel(false)}>
                <DialogTitle>Cancel Order</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>Are you sure cancel this order?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCancel(false)}>No</Button>
                    <Button onClick={handleCancelOrder}>Cancel Order</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCancelNotify} onClose={() => setOpenCancelNotify(false)}>
                <DialogTitle>Cancel Order</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>You can't cancel this order!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCancelNotify(false)}>I understand</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openGet} onClose={() => setOpenGet(false)}>
                <DialogTitle>Get Order</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>Are you sure get this order?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenGet(false)}>Cancel</Button>
                    <Button onClick={handleGetOrder}>Get Order</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDone} onClose={() => setOpenDone(false)}>
                <DialogTitle>Successful Delivery</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>Are you sure you have completed your order?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDone(false)}>Cancel</Button>
                    <Button onClick={handleDoneOrder}>Done</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
