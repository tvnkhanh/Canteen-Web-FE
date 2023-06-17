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
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Title from '~/pages/Management/Title';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Colors } from '~/styles/theme';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

let oldAddress = '';

export default function Address() {
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(5);
    const [openAdd, setOpenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState();

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    function getData() {
        axios.get(`http://localhost:8080/user/address/${localStorage.getItem('userId')}`).then((response) => {
            setData(response.data);
        });

        axios.get(`http://localhost:8080/get-user/${localStorage.getItem('userId')}`).then((response) => {
            setUser(response.data);
        });
    }

    const handleAdd = () => {
        if (phone !== '') {
            user.phoneNumber = phone;
        }

        axios.post(`http://localhost:8080/address/save`, {
            address: address,
            userId: localStorage.getItem('userId'),
        });
        axios.post('http://localhost:8080/user', user);

        setOpenAdd(false);
        getData();
    };

    const handleDelete = () => {
        axios.post('http://localhost:8080/address/delete', {
            address: oldAddress,
            userId: localStorage.getItem('userId'),
        });

        setOpenDelete(false);
        getData();
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <React.Fragment>
            <Box display={'flex'} alignItems="center" justifyContent={'space-between'}>
                <Title>My address</Title>

                <Button onClick={() => setOpenAdd(true)}>
                    <AddCircleIcon />
                    <Typography ml={2}>Add new address</Typography>
                </Button>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.slice(pg * rpg, pg * rpg + rpg).map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <Typography>{item.firstName + ' ' + item.lastName}</Typography>
                                <Typography>{item.address}</Typography>
                                <Typography>{item.phoneNumber}</Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Button
                                    onClick={() => {
                                        setOpenDelete(true);
                                        oldAddress = item.address;
                                    }}
                                >
                                    <DeleteIcon />
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

            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Add Address</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>To add a new address, please fill in the information below.</DialogContentText>
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone"
                        type="tel"
                        variant="standard"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        variant="standard"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>Are you sure delete this address?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>

            {/* <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
                <DialogTitle>Add Product</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>Your address is already exists.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAlert(false)}>OK</Button>
                </DialogActions>
            </Dialog> */}
        </React.Fragment>
    );
}
