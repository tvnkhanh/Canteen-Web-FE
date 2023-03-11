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
                <Typography variant="h6">Now Available</Typography>
                <BannerTitle variant="h4">Genshin</BannerTitle>
                <BannerDescription variant="subtitle">
                    Trải nghiệm cảm giác mạo hiểm cá nhân. Trong vai trò là Nhà Lữ Hành đến từ thế giới khác, bạn bước
                    vào hành trình tìm lại chính mình và người thân mất tích.
                </BannerDescription>
                <BannerCanteenButton color="primary">Play Now</BannerCanteenButton>
            </BannerContent>
        </BannerContainer>
    );
}
