import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import AppBarDesktop from './AppbarDesktop';
import AppBarMobile from './AppbarMobile';

export default function AppBar() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return <>{matches ? <AppBarMobile matches={matches} /> : <AppBarDesktop matches={matches} />}</>;
}
