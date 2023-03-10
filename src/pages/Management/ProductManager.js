import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { products } from '~/components/appbar/AccountMenu';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

let data = [];
let items = {};

function createData(productId, name, price, quantity, image, description) {
    return { productId, name, price, quantity, image, description };
}

export default function ProductManager() {
    if (data.length === 0) {
        products.map((product) => {
            data.push(
                createData(
                    product.productId,
                    product.name,
                    product.price,
                    product.quantity,
                    product.image,
                    product.description,
                ),
            );
        });
    } else {
        data = [];
        products.map((product) => {
            data.push(
                createData(
                    product.productId,
                    product.name,
                    product.price,
                    product.quantity,
                    product.image,
                    product.description,
                ),
            );
        });
    }

    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [image, setImage] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleAdd = async () => {
        let product = {
            name: name,
            price: price,
            quantity: quantity,
            image: image,
            description: description,
        };

        if (name !== '' && price !== '' && quantity !== '' && image !== '' && description !== '') {
            await axios.post(`http://localhost:8080/product/add`, product);
        }
        setName('');
        setPrice('');
        setQuantity('');
        setImage('');
        setDescription('');

        setOpenAdd(false);
    };

    const handleEdit = async () => {
        let product = {
            name: '',
            price: '',
            quantity: '',
            image: '',
            description: '',
        };

        if (name === '') {
            product.name = items.name;
        } else {
            product.name = name;
        }

        if (price === '') {
            product.price = items.price;
        } else {
            product.price = price;
        }

        if (quantity === '') {
            product.quantity = items.quantity;
        } else {
            product.quantity = quantity;
        }

        if (image === '') {
            product.image = items.image;
        } else {
            product.image = image;
        }

        if (description === '') {
            product.description = items.description;
        } else {
            products.description = description;
        }

        if (name !== '' || price !== '' || quantity !== '' || image !== '' || description !== '') {
            await axios.post(`http://localhost:8080/product/edit/${items.productId}`, product);
        }

        setName('');
        setPrice('');
        setQuantity('');
        setImage('');
        setDescription('');

        setOpenEdit(false);
    };

    const handleDelete = async () => {
        await axios.post(`http://localhost:8080/product/delete/${items.productId}`);

        setOpenDelete(false);
    };

    return (
        <React.Fragment>
            <Title>Products</Title>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="center">Add</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.productId}>
                            <TableCell>{item.productId}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                                {item.image.length <= 18 ? item.image : item.image.substr(0, 18) + '...'}
                            </TableCell>
                            <TableCell>
                                {item.description.length <= 18
                                    ? item.description
                                    : item.description.substr(0, 18) + '...'}
                            </TableCell>
                            <TableCell>
                                <Button onClick={handleOpenAdd}>
                                    <AddCircleIcon />
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button>
                                    <EditIcon
                                        onClick={() => {
                                            handleOpenEdit();
                                            items = item;
                                        }}
                                    />
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button>
                                    <DeleteIcon
                                        onClick={() => {
                                            handleOpenDelete();
                                            items = item;
                                        }}
                                    />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Add Product</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>To add a new product, please fill in the information below.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        variant="standard"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        variant="standard"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="quantity"
                        label="Quantity"
                        type="number"
                        variant="standard"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="image"
                        label="Image"
                        type="text"
                        variant="standard"
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        variant="standard"
                        fullWidth
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>To edit a product, please fill in the information below.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        variant="standard"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        variant="standard"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="quantity"
                        label="Quantity"
                        type="number"
                        variant="standard"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="image"
                        label="Image"
                        type="text"
                        variant="standard"
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        variant="standard"
                        fullWidth
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleEdit}>Edit</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>Are you sure delete this product?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
