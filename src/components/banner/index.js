import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    BannerCanteenButton,
    BannerContainer,
    BannerContent,
    BannerDescription,
    BannerImage,
    BannerTitle,
} from '~/styles/banner';
import imageTest from '~/assets/kokofish_my_waifu.gif';

export default function Banner() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <BannerContainer>
            <BannerImage src={imageTest} />
            <BannerContent>
                <Typography variant="h6">Huge Collections</Typography>
                <BannerTitle variant="h2">New Bags</BannerTitle>
                <BannerDescription variant="subtitle">
                    Lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolore magna aliqu
                </BannerDescription>
                <BannerCanteenButton color="primary">Show Now</BannerCanteenButton>
            </BannerContent>
        </BannerContainer>
    );
}
