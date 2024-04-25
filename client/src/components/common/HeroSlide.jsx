import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import photoApi from "../../api/modules/photo.api";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../../redux/features/globalLoading";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import uiConfigs from "../../configs/ui.config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { routesGen } from "../../routers/routes";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "swiper/css";
import "swiper/css/pagination";

const HeroSlide = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getPhotos = async () => {
      const { response, err } = await photoApi.getListPhotos();
      if (response) setPhotos(response);
      if (err) toast.error(err.message);
    };

    getPhotos();
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    console.log(sliderRef.current.swiper.slidePrev());
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&::before": {
          content: "''",
          width: "100%",
          height: "30%",
          position: "absolute",
          left: 0,
          bottom: 0,
          zIndex: 2,
          pointerEvents: "none",
        
        },
      }}
    >
      <Swiper
        ref={sliderRef}
        grabCursor={true}
        modules={[Autoplay, Navigation]}
        loop={true}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        <SwiperSlide>
          <Box
            sx={{
              paddingTop: {
                xs: "130%",
                sm: "80%",
                md: "60%",
                lg: "48%",
              },
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(https://promo-theme.com/novo/wp-content/uploads/2017/08/slide18.jpg)`,
            }}
          />

          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              bottom: 0,
              paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                paddingX: "30px",
                color: "secondary.colorText",
                width: { sm: "unset", md: "30%", lg: "40%" },
              }}
            >
              <Stack spacing={4} direction="column">
                <Box
                  sx={{
                    position: "relative",
                    fontSize: "1.2rem",
                    "&::before": {
                      position: "absolute",
                      content: "''",
                      width: "35px",
                      height: "1.2px",
                      backgroundColor: "primary.main",
                      borderRadius: "10px",
                    },
                  }}
                >
                  Portraits
                </Box>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "2.6rem" }}
                  fontWeight="700"
                  sx={{
                    ...uiConfigs.style.typoLines(2, "left"),
                  }}
                >
                  Love with tear apart again
                </Typography>

                <Typography
                  sx={{ ...uiConfigs.style.typoLines(3), fontSize: '1rem' }}
                  variant="body1"
                >
                  {
                    "The world without photography will be"
                  }
                </Typography>
                <Button
                  size="medium"
                  component={Link}
                  to={routesGen.photoDetail("0901923")}
                  sx={{ width: "max-content", color: "primary.main" }}
                  endIcon={<NavigateNextIcon />}
                >
                  View More
                </Button>
              </Stack>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box
            sx={{
              paddingTop: {
                xs: "130%",
                sm: "80%",
                md: "60%",
                lg: "48%",
              },
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(https://promo-theme.com/novo/wp-content/uploads/2017/08/slide20.jpg)`,
            }}
          />

          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              bottom: 0,
              paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                paddingX: "30px",
                color: "secondary.colorText",
                width: { sm: "unset", md: "30%", lg: "40%" },
              }}
            >
              <Stack spacing={4} direction="column">
                <Box
                  sx={{
                    position: "relative",
                    fontSize: "1.2rem",
                    "&::before": {
                      position: "absolute",
                      content: "''",
                      width: "35px",
                      height: "1.2px",
                      backgroundColor: "primary.main",
                      borderRadius: "10px",
                    },
                  }}
                >
                  Portraits
                </Box>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "2.6rem" }}
                  fontWeight="700"
                  sx={{
                    ...uiConfigs.style.typoLines(2, "left"),
                  }}
                >
                  Love with tear apart again
                </Typography>

                <Typography
                  sx={{ ...uiConfigs.style.typoLines(3), fontSize: '1rem' }}
                  variant="body1"
                >
                  {
                    "The world without photography will be"
                  }
                </Typography>
                <Button
                  size="medium"
                  component={Link}
                  to={routesGen.photoDetail("0901923")}
                  sx={{ width: "max-content", color: "primary.main" }}
                  endIcon={<NavigateNextIcon />}
                >
                  View More
                </Button>
              </Stack>
            </Box>
          </Box>
        </SwiperSlide>

        <Stack
          direction={"row"}
          sx={{
            position: "absolute",
            color: "red",
            bottom: "3rem",
            right: "8%",
            zIndex: 9,
          }}
        >
          <IconButton onClick={handlePrev}>
            <NavigateBeforeIcon sx={{ fontSize: "2rem", color: "#fff" }} />
          </IconButton>

          <IconButton onClick={handleNext}>
            <NavigateNextIcon sx={{ fontSize: "2rem", color: "#fff" }} />
          </IconButton>
        </Stack>
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
