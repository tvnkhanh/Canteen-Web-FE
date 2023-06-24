import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
    Alert,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormHelperText,
    IconButton,
} from '@mui/material';
import { Colors } from '~/styles/theme';
import CloseIcon from '@mui/icons-material/Close';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link to="https://www.facebook.com/profile.php?id=100007430475783" style={{ color: Colors.light_blue }}>
                Canteen PTIT
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const successAccount = {
    email: null,
};

export default function SignUp() {
    const navigate = useNavigate();
    const [openErrEmail, setOpenErrEmail] = React.useState();
    const [openPasswordLength, setOpenPasswordLength] = React.useState();
    const [openNotify, setOpenNotify] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const account = {
            email: data.get('email'),
            password: data.get('password'),
            status: 'ACTIVE',
        };

        const user = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            phoneNumber: data.get('phone'),
            gender: 'male',
        };

        if (data.get('password').length < 8) {
            setOpenPasswordLength(true);
        }

        await axios.get(`http://localhost:8080/user/${data.get('email')}`).then(async (response) => {
            if (response.status === 200 && response.data.length !== 0) {
                setOpenErrEmail(true);
            } else {
                await axios.post('http://localhost:8080/account', account).then(async (response) => {
                    await axios.post(`http://localhost:8080/user/${data.get('email')}`, user).then(async (response) => {
                        await axios.post(`http://localhost:8080/new-order/${response.data.userId}`, {
                            status: 'PENDING',
                        });
                        if (response.status === 200) {
                            successAccount.email = response.data.email;
                            setOpenNotify(true);
                        }
                    });
                });
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                                <FormHelperText></FormHelperText>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    type="tel"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signin" style={{ color: Colors.light_blue }} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />

                <Box sx={{ width: '30%', position: 'absolute', top: 40, right: 20 }}>
                    <Collapse in={openErrEmail}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenErrEmail(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            This email is already exists, please select the others!
                        </Alert>
                    </Collapse>
                </Box>

                <Box sx={{ width: '30%', position: 'absolute', top: 40, right: 20 }}>
                    <Collapse in={openPasswordLength}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenPasswordLength(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Password must be longer than 8 character.
                        </Alert>
                    </Collapse>
                </Box>

                <Dialog open={openNotify} onClose={() => setOpenNotify(false)}>
                    <DialogTitle>Successful</DialogTitle>
                    <DialogContent
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                    >
                        <DialogContentText>You have successfully signed up.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => navigate('/signin')}>Go To Login</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
}

export { successAccount };
