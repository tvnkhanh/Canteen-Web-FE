import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { successAccount } from '../SignUp';
import { Colors } from '~/styles/theme';
import { Alert, Collapse, FormControl, FormHelperText, IconButton } from '@mui/material';
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

export default function SignIn() {
    const navigate = useNavigate();
    const [openErrEmail, setOpenErrEmail] = React.useState();
    const [openErrPassword, setOpenErrPassword] = React.useState();
    const [openBanned, setOpenBanned] = React.useState();
    const [openPasswordLength, setOpenPasswordLength] = React.useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios
            .get(`http://localhost:8080/user/${data.get('email')}`)
            .then((response) => {
                localStorage.setItem('email', response.data[0].email);
                localStorage.setItem('password', response.data[0].password);
                localStorage.setItem('userId', response.data[0].userId);
                localStorage.setItem('role', response.data[0].role);
                localStorage.setItem('status', response.data[0].status);
                localStorage.setItem('firstName', response.data[0].firstName);
                localStorage.setItem('lastName', response.data[0].lastName);
                localStorage.setItem('phone', response.data[0].phone);
                localStorage.setItem('gender', response.data[0].gender);

                if (
                    localStorage.getItem('email') === data.get('email') &&
                    localStorage.getItem('password') === data.get('password') &&
                    localStorage.getItem('status') !== 'BANNED'
                ) {
                    navigate('/');
                } else if (localStorage.getItem('password').length < 8) {
                    setOpenPasswordLength(true);
                } else if (localStorage.getItem('password') !== data.get('password')) {
                    setOpenErrPassword(true);
                } else if (localStorage.getItem('status') === 'BANNED') {
                    setOpenBanned(true);
                }
            })
            .catch((error) => {
                setOpenErrEmail(true);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <AccountCircleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                defaultValue={successAccount.email && successAccount.email}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="#" style={{ color: Colors.light_blue }} variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/signup" style={{ color: Colors.light_blue }} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>

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
                            Wrong email, please try again!
                        </Alert>
                    </Collapse>
                </Box>

                <Box sx={{ width: '30%', position: 'absolute', top: 40, right: 20 }}>
                    <Collapse in={openErrPassword}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenErrPassword(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Wrong password, please try again!
                        </Alert>
                    </Collapse>
                </Box>

                <Box sx={{ width: '30%', position: 'absolute', top: 40, right: 20 }}>
                    <Collapse in={openBanned}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenBanned(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Your account has been banned. Please contact admin for further.
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
            </Grid>
        </ThemeProvider>
    );
}
