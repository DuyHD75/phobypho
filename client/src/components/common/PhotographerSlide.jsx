import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import uiConfigs from "../../configs/ui.config";


const PhotographerSlide = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // const getListPhotos = async () => {
    //      const { response, err } = await photoApi.getPhotoDetail();

    //      response && setPhotos(response);

    //      err && toast.error(err.message);
    // }

    const fetchedImageData = [
      {
        id: "1",
        img: "https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/icons%2FScreenshot%202024-06-13%20192939.png?alt=media&token=14ac0f20-950c-418f-9203-f1dc02bb499c",
        title: "Combo Cá Nhân",
        price: "200K",
      },
      {
        id: "2",
        img: "https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/icons%2FScreenshot%202024-06-13%20192855.png?alt=media&token=0d5809fd-3e55-406e-8971-ad520083d239",
        title: "Combo Cặp Đôi",
        price: "500K",
      },
      {
        id: "3",
        img: "https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/icons%2FScreenshot%202024-06-13%20192959.png?alt=media&token=aa577103-bb66-4c07-91b9-56df905bf0d9",
        title: "Combo Cá Nhân",
        price: "400K",
      },
    ];

    setPhotos(fetchedImageData);
  }, []);

  return (
    <Fragment>
      <AutoSwiper>
        {photos.map((photo, index) => (
          <SwiperSlide key={index} >
            <Link style={{ textDecoration: 'none' }} >
              <Box sx={{
                height: '550px',
                transition: 'all .9s ease',
                "&:hover .photo-option": {
                  top: { xs: '20%', md: '35%', lg: '45%' },
                  opacity: 1,
                  transition: 'all .9s ease'
                },
                color: "primary.contrastText",
              boxShadow: 3,
                borderColor: 'primary.main'
              }}>
                <img src={photo.img} alt="" style={{
                  width: "100%",
                  position: 'relative',
                  height: "100%",
                  left: 0,
                  objectFit: "cover",
                  zIndex: -1
                }} />
                <Fragment>
                  <Box className="photo-back-drop" sx={{
                    opacity: { xs: 1, md: 0 },
                    transition: "all .5s ease",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
                  }} />

                  <Box
                    className="photo-info"
                    sx={{
                      transition: "all .5s ease",
                      textAlign: 'center',
                      position: 'relative',
                      top: { xs: '-6rem', md: '-34rem', sm: '-20rem' },
                      width: "100%",
                      height: "max-content",
                      boxSizing: "border-box",
                      padding: { xs: "10px", md: "2rem 1rem" }
                    }}
                  >
                    <Stack spacing={{ xs: 1, md: 2 }} direction={'column'} alignItems={"center"}>
                      <Typography
                        variant="body1"
                        fontWeight="600"

                        sx={{
                          ...uiConfigs.style.typoLines(1, "center"),
                          fontWeight: '700',
                          fontSize: { xs: '1rem', md: '1.5rem' },
                          textTransform: 'uppercase',
                          color: '#000'
                        }}
                      >
                        {photo.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="700"
                        sx={{
                          fontSize: { xs: '2.5rem', md: '3rem' },
                          ...uiConfigs.style.typoLines(1, "center"),
                          color: '#2d89e5'
                        }}
                      >
                        {photo.price}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box
                    className="photo-option"
                    sx={{
                      transition: "all .8s ease",
                      position: 'absolute',
                      width: "100%",
                      opacity: 0,
                      height: "max-content",
                      boxSizing: "border-box",
                      padding: { xs: "10px", md: "2rem 1rem" },
                      backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
                    }}
                  >
                    <Stack spacing={3} direction={'column'}>
                      <Typography
                        variant='h3'
                        sx={{
                          fontSize: '1.4rem',
                          fontWeight: '800',
                          ...uiConfigs.style.typoLines(1, 'center'),
                          position: 'relative',
                          padding: '0.6rem',
                          "&::before": {
                            content: '""',
                            position: 'absolute',
                            width: '20%',
                            height: '2px',
                            bgcolor: '#c48F56',
                            bottom: 0,
                            borderRadius: '5px',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }
                        }}
                      >Lợi ích nhận được:</Typography>


                      <Typography
                        sx={{
                          fontSize: '1rem',
                          ...uiConfigs.style.typoLines(1, 'center'),
                          position: 'relative',
                          padding: '0.6rem',
                          "&::before": {
                            content: '""',
                            position: 'absolute',
                            width: '2rem',
                            height: '3px',
                            bgcolor: 'rgba(255, 255, 255, 0.7)',
                            bottom: 0,
                            borderRadius: '5px',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }
                        }}
                      >20 ảnh đã chỉnh sửa theo ý khách hàng</Typography>


                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: '400',
                          ...uiConfigs.style.typoLines(1, 'center'),
                          position: 'relative',
                          padding: '0.6rem',
                          "&::before": {
                            content: '""',
                            position: 'absolute',
                            width: '2rem',
                            height: '3px',
                            bgcolor: 'rgba(255, 255, 255, 0.7)',
                            bottom: 0,
                            borderRadius: '5px',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }
                        }}
                      >Địa điểm và concept linh hoạt. </Typography>


                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: '400',
                          ...uiConfigs.style.typoLines(1, 'center'),
                          position: 'relative',
                          padding: '0.6rem',
                          "&::before": {
                            content: '""',
                            position: 'absolute',
                            width: '2rem',
                            height: '3px',
                            bgcolor: 'rgba(255, 255, 255, 0.7)',
                            bottom: 0,
                            borderRadius: '5px',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }
                        }}
                      >Nhận tất cả file ảnh gốc. Chăm sóc chu đáo, gợi ý dáng chụp</Typography>

                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: '400',
                          ...uiConfigs.style.typoLines(1, 'center'),
                          position: 'relative',
                          padding: '0.6rem',
                          "&::before": {
                            content: '""',
                            position: 'absolute',
                            width: '2rem',
                            height: '3px',
                            bgcolor: 'rgba(255, 255, 255, 0.7)',
                            bottom: 0,
                            borderRadius: '5px',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }
                        }}
                      >Thời gian chụp 2-3 giờ</Typography>
                    </Stack>
                  </Box>
                </Fragment>

              </Box>
            </Link >
          </SwiperSlide>
        ))}
      </AutoSwiper>
    </Fragment>
  );
};

export default PhotographerSlide;
