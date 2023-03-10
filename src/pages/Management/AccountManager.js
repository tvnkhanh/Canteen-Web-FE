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
    TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import Title from './Title';
import { users } from './ListItems';
import BlockIcon from '@mui/icons-material/Block';
import axios from 'axios';

let data = [];
const account = {
    email: '',
    password: '',
    status: '',
    roleId: 2,
};

function createData(userId, name, password, phone, gender, email, status) {
    return { userId, name, password, phone, gender, email, status };
}

export default function AccountManager() {
    const [value, setValue] = useState();

    const refresh = () => {
        setValue({});
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBlock = async () => {
        if (account.status === 'ACTIVE') {
            await axios.post('http://localhost:8080/account/ban', account);
        } else {
            await axios.post('http://localhost:8080/account/active', account);
        }

        setOpen(false);
    };

    if (data.length === 0) {
        users.map((user) => {
            data.push(
                createData(
                    user.userId,
                    user.firstName + ' ' + user.lastName,
                    user.password,
                    user.phone,
                    user.gender,
                    user.email,
                    user.status,
                ),
            );
        });
    } else {
        data = [];
        users.map((user) => {
            data.push(
                createData(
                    user.userId,
                    user.firstName + ' ' + user.lastName,
                    user.password,
                    user.phone,
                    user.gender,
                    user.email,
                    user.status,
                ),
            );
        });
    }

    return (
        <React.Fragment>
            <Title>Products</Title>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Ban</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.userId}>
                            <TableCell>{item.userId}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.gender}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell align="center">{item.status}</TableCell>
                            <TableCell align="center">
                                <Button
                                    onClick={() => {
                                        handleOpen();
                                        account.email = item.email;
                                        account.password = item.password;
                                        account.status = item.status;
                                    }}
                                >
                                    <BlockIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>Are you sure ban / unban this account?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleBlock}>Agree</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
