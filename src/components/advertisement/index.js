import { Box, Slide } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { AdvertisementContainer, MessageText } from '~/styles/advertisement';

const messages = [
    'Căn tin học viện công nghệ bưu chính viễn thông!',
    'Thực đơn, đồ ăn vặt, đồ uống đa dạng',
    'Rất hân hạnh khi được phục vụ các bạn sinh viên',
];

export default function Advertisement() {
    const containerRef = useRef();
    const [messageIndex, setMessageIndex] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 3000);

        const intervalId = setInterval(() => {
            setMessageIndex((i) => (i + 1) % messages.length);

            setShow(true);

            setTimeout(() => {
                setShow(false);
            }, 3000);
        }, 4000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <AdvertisementContainer>
            <Slide
                container={containerRef.current}
                direction={show ? 'left' : 'right'}
                in={show}
                timeout={{
                    enter: 500,
                    exit: 100,
                }}
            >
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <MessageText>{messages[messageIndex]}</MessageText>
                </Box>
            </Slide>
        </AdvertisementContainer>
    );
}
