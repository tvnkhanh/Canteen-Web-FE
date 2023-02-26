import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Colors } from '../theme';

export const AdvertisementContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        padding: '40px 0px 40px 0px',
    },

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0px 20px 0px',
    overflow: 'hidden',
    background: Colors.secondary,
}));

export const MessageText = styled(Typography)(({ theme }) => ({
    fontFamily: `"Montez", "cursive"`,
    [theme.breakpoints.down('md')]: {
        fontSize: '3rem',
    },
    color: Colors.white,
    fontSize: '1.5rem',
}));
