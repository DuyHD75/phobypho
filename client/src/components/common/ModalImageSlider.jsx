import React, { Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from '@mui/system';
import { Modal, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { EffectCreative } from 'swiper/modules';

const ModalContent = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    maxWidth: '1000px',
});

const SwiperContainer = styled('div')({
    width: '100%',
    height: '100%',
});

const SwiperSlideItem = styled(SwiperSlide)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1000px',
    height: '600px',

});

const Image = styled('img')({
    width: '100%',
    height: '100%',

});

const AlbumName = styled('h2')({
    position: 'absolute',
    top: '10px',
    left: '10px',
    fontSize: '1.6rem',
    zIndex: 10000,
    textTransform: "capitalize",
    textShadow: '1px 1px 1px #000'
})

const ModalImageSlider = ({ album, isOpen, onClose }) => {

    if (!album || !album.images || album.images.length === 0) {
        return null;
    }
    return (
        <Fragment>
            {album && (

                <Fragment>
                    <Modal open={isOpen} onClose={onClose}>

                        <ModalContent>
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '30px',
                                    zIndex: 100000,
                                    fontSize: '4rem',
                                    color: '#000',
                                    bgcolor: 'primary.main'
                                }}
                                onClick={() => onClose(false)}
                            >
                                <CloseIcon />
                            </IconButton>
                            <SwiperContainer>

                                <Box
                                    className='voucher_selected'
                                    sx={{
                                        position: 'absolute',
                                        width: 'max-content',
                                        p: 4,
                                        zIndex: 10000,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#ffff',
                                        fontSize: '1.2rem',
                                        fontWeight: '600',
                                    }}
                                >
                                    {album.albumName}
                                </Box>
                                <Swiper
                                    grabCursor={true}
                                    effect={'creative'}
                                    creativeEffect={{
                                        prev: {
                                            shadow: true,
                                            translate: [0, 0, -400],
                                        },
                                        next: {
                                            translate: ['100%', 0, 0],
                                        },
                                    }}
                                    modules={[EffectCreative]}
                                    className="mySwiper"
                                >
                                    {album.images.map((image, index) => (
                                        <SwiperSlideItem key={index} sx={{
                                            background: 'transparent',
                                        }}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundImage: `url(${image})`,
                                                    backgroundSize: 'contain',
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                    transition: 'all 0.5s ease',
                                                }}
                                            ></Box>
                                        </SwiperSlideItem>
                                    ))}
                                </Swiper>
                            </SwiperContainer>
                        </ModalContent>
                    </Modal>

                </Fragment>



            )}

        </Fragment>
    );
};

export default ModalImageSlider;