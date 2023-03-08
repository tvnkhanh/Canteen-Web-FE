import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Colors } from '~/styles/theme';

export default function SignInSignUpBtn() {
    return (
        <Stack ml={3} mr={3} spacing={2} direction={'row'}>
            <Link to="/signin" style={{ textDecoration: 'none', color: Colors.secondary }}>
                <Button variant="outlined">Sign In</Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none', color: Colors.secondary }}>
                <Button variant="outlined">Sign Up</Button>
            </Link>
        </Stack>
    );
}
