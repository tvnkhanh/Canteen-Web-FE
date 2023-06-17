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
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Title from './Title';
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
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    function getData() {
        axios.get(`http://localhost:8080/users/USER`).then((response) => {
            setUsers(response.data);
        });
    }

    useEffect(() => {
        getData();
    }, []);

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
        getData();
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
            <Title>Accounts</Title>
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
                    {data.slice(pg * rpg, pg * rpg + rpg).map((item) => (
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

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

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
