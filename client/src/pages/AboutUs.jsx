import React, { Fragment, useEffect } from "react";
import CameraIcon from "@mui/icons-material/Camera";
import {
  Box,
  Typography,
  Stack,
  Grid,
  Paper
} from "@mui/material";
import uiConfigs from "../configs/ui.config";
import Logo from "../components/common/Logo";
import { keyframes } from "@mui/system";
import Container from "../components/common/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { members } from "../asset/data";
import { eventImages } from "../asset/data";
import { setGlobalLoading } from "../redux/features/globalLoading";
import { useDispatch } from "react-redux";


function AboutUs() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGlobalLoading(true));
    setTimeout(() => {
      dispatch(setGlobalLoading(false));
    }, 500);
  }, []);




  return (
    <Box sx={{ marginTop: '90px' }}>
      <Box sx={{
        ...uiConfigs.style.mainContent,
        padding: { xs: "16px", md: "0 4rem" },
        color: 'secondary.colorText'
      }}  >
        <Stack padding={'3rem'}>
          <Typography sx={{
            ...uiConfigs.style.typoLines(1, 'center'),
            stroke: "#313131",
            strokeWidth: "1px",
            fontSize: { xs: "2rem", md: "3rem" },
            textShadow: "2px 2px 4px #000",
            color: 'primary.headerColor',
            textTransform: 'uppercase',

          }}>About Us</Typography>

          <Typography sx={{
            ...uiConfigs.style.typoLines(2, 'center'),
            textTransform: 'uppercase',
            fontSize: { sx: '1.8rem', md: '2rem' },
            fontWeight: '700',
            color: 'primary.main',
          }}>Đột phá những giới hạn</Typography>

          <Typography sx={{
            ...uiConfigs.style.typoLines(3, 'center'),
            textTransform: 'capitalize',
            color: '#5a626e',
          }}>Cùng tạo nên một cộng đồng photographer by phone và những dịch vụ tốt nhất cho khách hàng</Typography>

          <Grid container marginTop={'3rem'} spacing={3}>
            <Grid item xs={12} md={4} >
              <Box sx={{ borderRadius: '2rem', border: '2px solid #2D89E5', padding: '2rem 10px', height: '100%' }}>
                <Box sx={{
                  height: '100px',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(https://mui.com/static/branding/about/illustrations/community-dark.svg)`,
                  backgroundSize: 'container',
                  backgroundPosition: 'center',
                }} />


                <Typography sx={{
                  ...uiConfigs.style.typoLines(1, 'center'),
                  textTransform: 'uppercase',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'secondary.colorText',
                }}>Our Mission</Typography>
                <Typography sx={{
                  ...uiConfigs.style.typoLines(3, 'center'),
                  textTransform: 'capitalize',
                  fontSize: '0.9rem',
                  color: '#333',
                }}>Tạo ra một cộng đồng chia sẻ kiến thức, kinh nghiệm và những bức ảnh đẹp nhất</Typography>
              </Box>

            </Grid>

            <Grid item xs={12} md={4} >
              <Box sx={{ borderRadius: '2rem', border: '2px solid #2D89E5', padding: '2rem 10px', height: '100%' }}>
                <Box sx={{
                  height: '100px',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(https://mui.com/static/branding/about/illustrations/better-dark.svg)`,
                  backgroundSize: 'container',
                  backgroundPosition: 'center',
                }} />


                <Typography sx={{
                  ...uiConfigs.style.typoLines(1, 'center'),
                  textTransform: 'uppercase',
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: 'secondary.colorText',
                }}>Our Vision</Typography>
                <Typography sx={{
                  ...uiConfigs.style.typoLines(3, 'center'),
                  textTransform: 'capitalize',
                  fontSize: '0.9rem',
                  color: '#333',
                }}>Trở thành một trong những trang web hàng đầu về chụp ảnh bằng điện thoại</Typography>

              </Box>

            </Grid>

            <Grid item xs={12} md={4} >
              <Box sx={{ borderRadius: '2rem', border: '2px solid #2D89E5', padding: '2rem 10px', height: '100%' }}>
                <Box sx={{
                  height: '100px',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(https://mui.com/static/branding/about/illustrations/trust-dark.svg)`,
                  backgroundSize: 'container',
                  backgroundPosition: 'center',
                }} />
                <Typography sx={{
                  ...uiConfigs.style.typoLines(1, 'center'),
                  textTransform: 'uppercase',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'secondary.colorText',
                }}>Our Core Value</Typography>
                <Typography sx={{
                  ...uiConfigs.style.typoLines(3, 'center'),
                  textTransform: 'capitalize',
                  fontSize: '0.9rem',
                  color: '#333',
                }}>Chất lượng, uy tín, sáng tạo</Typography>
              </Box>

            </Grid>
          </Grid>
        </Stack>




      </Box>

      <Box sx={{ bgcolor: '#1b2935' }}>
        <Box sx={{ ...uiConfigs.style.mainContent, padding: '3rem' }}>
          <Typography
            variant="h3"
            sx={{
              color: '#99ccff',
              fontSize: '1.6rem',
              fontWeight: '800',
              textTransform: 'capitalize',
              ...uiConfigs.style.typoLines(1, 'left')
            }}>Những bước đi đầu tiên</Typography>
          <Typography
            variant="p"
            sx={{
              color: '#AEBACB',
              textTransform: 'normal',
              fontSize: '0.9rem',
              width: { sx: '100%', md: '50%' },
              ...uiConfigs.style.typoLines(2, 'left')
            }}
          >
            Những bước đi đầu tiên của chúng tôi đã tạo ra những dấu ấn đáng nhớ trong quá trình khởi nghiệp, phát triển, và định hình mục tiêu phát triển trong tương lai.
          </Typography>

          <Box sx={{ paddingTop: '3rem' }} >

            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              pagination={{
                clickable: false,
              }}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
              modules={[Autoplay]}
              className="mySwiper"
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                600: {
                  slidesPerView: 2,
                },

                960: {
                  slidesPerView: 3,
                },
              }}
            >

              {eventImages.map((eventImage, index) => (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      paddingTop: {
                        xs: "130%",
                        sm: "90%",
                        md: "60%",
                        lg: "48%",
                      },
                      minHeight: '200px',
                      borderRadius: '10px',
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundImage: `url(${eventImage.image})`,
                    }}
                  />
                </SwiperSlide>))
              }

            </Swiper>

            <Stack marginTop={'3rem'} flexDirection={{ sx: 'column', md: 'row' }} justifyContent={'center'} >
              <Box sx={{ margin: 0, width: { sx: '100%', md: '20%' }, margin: { sx: '1rem 0' } }} >
                <Typography variant="h3" sx={{ ...uiConfigs.style.typoLines(1, 'center'), color: "#95c7f9", fontWeight: '800' }}>2024</Typography>
                <Typography variant="p" sx={{ ...uiConfigs.style.typoLines(1, 'center'), color: '#aebacb' }}>Năm bắt đầu</Typography>
              </Box>
              <Box sx={{ margin: 0, width: { sx: '100%', md: '20%' }, margin: { sx: '1rem 0' } }}>
                <Typography variant="h3" sx={{ ...uiConfigs.style.typoLines(1, 'center'), color: "#95c7f9", fontWeight: '800' }}>100%</Typography>
                <Typography variant="p" sx={{ ...uiConfigs.style.typoLines(1, 'center'), color: '#aebacb' }}>Nguồn lực mọi nơi trên thế giới</Typography>
              </Box>
              <Box sx={{ margin: 0, width: { sx: '100%', md: '20%' }, margin: { sx: '1rem 0' } }}>
                <Typography variant="h3" sx={{ ...uiConfigs.style.typoLines(1, 'center'), color: "#95c7f9", fontWeight: '800' }}>1+</Typography>
                <Typography variant="p" sx={{ ...uiConfigs.style.typoLines(1, 'center'), color: '#aebacb' }}>Quốc gia đang hoạt động</Typography>
              </Box>
            </Stack>

          </Box>


        </Box >

      </Box >

      <Box sx={{
        backgroundColor: '#f5f7fa',
        backgroundImage: `url(https://us-wn-g.gr-cdn.com/_next/static/media/bg3.d94446d2.svg), url(https://us-wn-g.gr-cdn.com/_next/static/media/bg1.0d1d3b37.svg), url(https://us-wn-g.gr-cdn.com/_next/static/media/bg2.ad4bd4bc.svg)`,
        backgroundPosition: 'calc(50% - 418px) -30px, calc(50% - 357px) -370px, calc(50% + 570px) -170px',
        backgroundSize: '1742px 1742px,1210px 1210px,1665px 1665px'
      }}>
        <Box sx={{ ...uiConfigs.style.mainContent, padding: '3rem' }}>
          <Container>
            <Typography
              variant="h3"
              sx={{
                color: '#2e8be9',
                fontSize: '1.6rem',
                fontWeight: '800',
                textTransform: 'capitalize',
                textShadow: '1px 1px 1px #000',
                ...uiConfigs.style.typoLines(1, 'left')
              }}>Nhân sự của chúng tôi</Typography>
            <Typography
              variant="p"
              sx={{
                color: '#AEBACB',
                textTransform: 'normal',
                fontSize: '0.9rem',
                width: '50%',
                textShadow: '1px 1px 0.7px #000',
                ...uiConfigs.style.typoLines(2, 'left')
              }}
            >
              Chúng tôi là những người trẻ đam mê khởi nghiệp về công nghệ, muốn tạo ra một môi trường làm việc chuyên nghiệp, sáng tạo và đồng hành cùng nhau phát triển
            </Typography>

            <Box>
              <Grid container spacing={3} >
                {members.map((person) => (
                  <Grid item xs={12} sm={4} md={3} key={person.name}>

                    <Paper sx={{
                      padding: 2,
                      bgcolor: '#fff',
                      boxShadow: '0 0 10px rgba(255,255,255,0.6)', 
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                      <Box sx={{
                        backgroundImage: `url(${person.image})`,
                        width: '100px',
                        height: '100px',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid #333',
                        marginRight: '1rem',
                        boxShadow: '0 0 10px rgba(0,0,0,0.4)'
                      }}></Box>
                      <Box>
                        <Typography variant="h6" sx={{
                          mt: 2, ...uiConfigs.style.typoLines(1, 'left'),
                          color: 'secondary.colorText', fontSize: '1.2rem', fontWeight: '700'
                        }}>
                          {person.name}
                        </Typography>
                        <Typography variant="body2" sx={{
                          ...uiConfigs.style.typoLines(2, 'left'),
                          color: '#a2aebe',
                          textShadow: '1px 1px 0.7px #000',
                        }}>
                          {person.title}
                        </Typography>

                      </Box>
                    </Paper>
                  </Grid>
                ))}

              </Grid>
            </Box>

          </Container>

        </Box>

      </Box>




    </Box >
  );
}

export default AboutUs;
