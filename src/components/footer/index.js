import { Box, Button, Grid, List, ListItemText, Typography } from '@mui/material';
import { FooterTitle, SubcribeTf } from '~/styles/footer';
import { Colors } from '~/styles/theme';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import SendIcon from '@mui/icons-material/Send';
import { Stack } from '@mui/system';

export default function Footer() {
    return (
        <Box
            component="div"
            id="contact"
            sx={{
                background: Colors.shaft,
                color: Colors.white,
                p: { xs: 4, md: 10 },
                pt: 12,
                pb: 12,
                fontSize: { xs: '12px', md: '14px' },
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={6} lg={4}>
                    <FooterTitle variant="body1">About us</FooterTitle>
                    <Typography variant="caption2">
                        Canteen PTIT là một sản phẩm của học viện công nghệ bưu chính viễn thông, cơ sở thành phố Hồ Chí
                        Minh. Ra đời nhằm mục đích phục vụ cho các bạn sinh viên, giảng viên và nhân viên nhà trường.
                    </Typography>
                    <Box
                        sx={{
                            mt: 4,
                            color: Colors.dove_gray,
                        }}
                    >
                        <FacebookIcon sx={{ mr: 1 }} />
                        <InstagramIcon sx={{ mr: 1 }} />
                        <TwitterIcon />
                    </Box>
                </Grid>

                <Grid item md={6} lg={2}>
                    <FooterTitle variant="body1">Infomation</FooterTitle>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                About us
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Order Tracking
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Privacy & Policy
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Terms & Conditions
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>

                <Grid item md={6} lg={2}>
                    <FooterTitle variant="body1">My account</FooterTitle>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Log In
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                My Cart
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                My Account
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Wishlist
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>

                <Grid item md={6} lg={4}>
                    <FooterTitle variant="body1">Newsletter</FooterTitle>
                    <Stack direction="column">
                        <SubcribeTf color="primary" label="Email address" variant="standard" />
                        <Button
                            startIcon={<SendIcon sx={{ color: Colors.white }} />}
                            sx={{ mt: 4, mb: 4 }}
                            variant="contained"
                        >
                            Subcribe
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
