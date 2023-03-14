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
import bannerImage from '~/assets/canteen.jpg';

export default function Banner() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <BannerContainer>
            <BannerImage src={bannerImage} />
            <BannerContent>
                <Typography variant="h6">Now Available</Typography>
                <BannerTitle variant="h4">Canteen</BannerTitle>
                <BannerDescription variant="subtitle">
                    Meals made with love, right here in our school canteen.
                </BannerDescription>
                <BannerCanteenButton color="primary">Discovery Now</BannerCanteenButton>
            </BannerContent>
        </BannerContainer>
    );
}
