import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Colors } from '~/styles/theme';
import { clamp } from './clamp';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export default function InDec({ order }) {
    const clampV = clamp(1, 100);
    const [value, setValue] = useState(1);
    useEffect(() => {
        if (order !== undefined) {
            if (order.quantity !== undefined) {
                setValue(order.quantity);
            }
        }
    }, []);

    return (
        <Box display="flex">
            <IconButton
                sx={{
                    borderRadius: 0,
                    background: `${Colors.secondary}`,
                }}
                onClick={async () => {
                    setValue(clampV(value - 1));
                    if (order !== undefined) {
                        if (value !== 1) {
                            await axios.post(
                                `http://localhost:8080/cart/${order.orderId}/${order.productId}/${order.quantity - 1}`,
                            );
                        }
                    }
                }}
            >
                <RemoveIcon />
            </IconButton>

            <Typography
                variant="body2"
                sx={{
                    border: `1px solid ${Colors.secondary}`,
                    p: 2,
                }}
            >
                {value}
            </Typography>

            <IconButton
                sx={{
                    borderRadius: 0,
                    background: `${Colors.secondary}`,
                }}
                onClick={async () => {
                    setValue(clampV(value + 1));
                    if (order !== undefined) {
                        if (value !== 100) {
                            await axios.post(
                                `http://localhost:8080/cart/${order.orderId}/${order.productId}/${order.quantity + 1}`,
                            );
                        }
                    }
                }}
            >
                <AddIcon />
            </IconButton>
        </Box>
    );
}
