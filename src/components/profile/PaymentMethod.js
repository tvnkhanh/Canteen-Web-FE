import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
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

let cardInfo = {
    pinfoId: '',
    cardHolder: '',
    creditCardNum: '',
    validThru: '',
    cvv: '',
};

export default function PaymentMethod() {
    const [data, setData] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [cardHolder, setCardHolder] = useState('');
    const [creditCardNum, setCreditCardNum] = useState('');
    const [validThru, setValidThru] = useState('');
    const [cvv, setCvv] = useState('');
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);

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

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleAdd = () => {
        axios.post(`http://localhost:8080/card/save`, {
            cardHolder: cardHolder,
            creditCardNum: creditCardNum,
            validThru: validThru,
            cvv: cvv,
            userId: localStorage.getItem('userId'),
        });

        setOpenAdd(false);
    };

    const handleEdit = () => {
        axios.post(`http://localhost:8080/card/update`, {
            pinfoId: cardInfo.pinfoId,
            cardHolder: cardHolder === '' ? cardInfo.cardHolder : cardHolder,
            creditCardNum: creditCardNum === '' ? cardInfo.creditCardNum : creditCardNum,
            validThru: validThru === '' ? cardInfo.validThru : validThru,
            cvv: cvv === '' ? cardInfo.cvv : cvv,
            userId: localStorage.getItem('userId'),
        });

        setOpenEdit(false);
    };

    const handleDelete = () => {
        axios.post(`http://localhost:8080/card/delete/${cardInfo.pinfoId}`);

        setOpenDelete(false);
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/get-cards/${localStorage.getItem('userId')}`).then((response) => {
            setData(response.data);
        });
    }, [data]);

    return (
        <React.Fragment>
            <Box display={'flex'} alignItems="center" justifyContent={'space-between'}>
                <Title>My payment method</Title>

                <Button onClick={() => setOpenAdd(true)}>
                    <AddCircleIcon />
                    <Typography ml={2}>Add new card</Typography>
                </Button>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Card Holder</TableCell>
                        <TableCell>Card Num</TableCell>
                        <TableCell>Valid Thru</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.slice(pg * rpg, pg * rpg + rpg).map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.cardHolder}</TableCell>
                            <TableCell>
                                {item.creditCardNum.substr(0, 4) + '********' + item.creditCardNum.substr(-4)}
                            </TableCell>
                            <TableCell>{item.validThru.substr(2, 2) + '/' + item.validThru.substr(5, 2)}</TableCell>

                            <TableCell align="center">
                                <Button
                                    onClick={() => {
                                        setOpenEdit(true);
                                        cardInfo.pinfoId = item.pinfoId;
                                        cardInfo.cardHolder = item.cardHolder;
                                        cardInfo.creditCardNum = item.creditCardNum;
                                        cardInfo.validThru = item.validThru;
                                        cardInfo.cvv = item.cvv;
                                    }}
                                >
                                    <EditIcon />
                                </Button>
                            </TableCell>

                            <TableCell align="center">
                                <Button
                                    onClick={() => {
                                        setOpenDelete(true);
                                        cardInfo.pinfoId = item.pinfoId;
                                    }}
                                >
                                    <DeleteIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Add Credit Card</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>To add a new card, please fill in the information below.</DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardName"
                                label="Name on card"
                                fullWidth
                                autoComplete="cc-name"
                                variant="standard"
                                onChange={(e) => setCardHolder(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardNumber"
                                label="Card number"
                                fullWidth
                                autoComplete="cc-number"
                                variant="standard"
                                onChange={(e) => setCreditCardNum(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="expDate"
                                label="Expiry date"
                                fullWidth
                                autoComplete="cc-exp"
                                variant="standard"
                                onChange={(e) => setValidThru('20' + e.target.value + '-00')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cvv"
                                label="CVV"
                                helperText="Last three digits on signature strip"
                                fullWidth
                                autoComplete="cc-csc"
                                variant="standard"
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit Credit Card</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>To edit a card, please fill in the information below.</DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardName"
                                label="Name on card"
                                fullWidth
                                autoComplete="cc-name"
                                variant="standard"
                                onChange={(e) => setCardHolder(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardNumber"
                                label="Card number"
                                fullWidth
                                autoComplete="cc-number"
                                variant="standard"
                                onChange={(e) => setCreditCardNum(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="expDate"
                                label="Expiry date"
                                fullWidth
                                autoComplete="cc-exp"
                                variant="standard"
                                onChange={(e) => setValidThru('20' + e.target.value + '-00')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cvv"
                                label="CVV"
                                helperText="Last three digits on signature strip"
                                fullWidth
                                autoComplete="cc-csc"
                                variant="standard"
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleEdit}>Edit</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle>Delete Card</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>Are you sure delete this card?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
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
