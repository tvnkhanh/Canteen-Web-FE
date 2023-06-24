import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm, { address } from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import axios from 'axios';
import { orderData as orders } from '../cart';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [openFail, setOpenFail] = React.useState(false);

    const navigate = useNavigate();

    React.useEffect(() => {
        console.log(address);
    }, [address]);

    const handleNext = async () => {
        setActiveStep(activeStep + 1);
        if (activeStep === 2) {
            await axios
                .post(`http://localhost:8080/make-order/${localStorage.getItem('orderId')}`)
                .then(async (response) => {
                    if (response.data === 'OK') {
                        await axios.post('http://localhost:8080/set-order-time', {
                            deliveryId: orders[0].deliveryId,
                            address: address,
                            departureTime: null,
                            arrival: null,
                        });

                        await axios.post(`http://localhost:8080/new-order/${response.data.userId}`, {
                            status: 'PENDING',
                        });
                    } else {
                        setOpenFail(true);
                        navigate('/cart');
                    }
                });
        }
    };

    console.log(orders);

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                        position: 'relative',
                        borderBottom: (t) => `1px solid ${t.palette.divider}`,
                    }}
                ></AppBar>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Checkout
                        </Typography>
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #{localStorage.getItem('orderId')}. We have emailed your order
                                    confirmation, and will send you an update when your order has shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}

                                    <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </Paper>
                </Container>
            </ThemeProvider>

            <Dialog open={openFail} onClose={() => setOpenFail(false)}>
                <DialogTitle>Out of stock</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <DialogContentText>
                        Some of your product is out of stock, please check your quantity. Place order fails.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenFail(false)}>I understand</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
