import { Box } from "@mui/material";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const AutoSwiper = ({ children }) => {
     return (
          <Box sx={{
               // "& .swiper-slide": {
               //      width: {
               //           xs: "50%",
               //           sm: "35%",
               //           md: "25%",
               //           lg: "20.5%"
               //      }
               // }
          }}>
               <Swiper
                    slidesPerView="auto"
                    modules={[Autoplay, Navigation]}
                    loop={true}
                    autoplay={{
                         delay: 3000,
                         disableOnInteraction: true
                    }}
                    grabCursor={true}
                    style={{ width: "100%", height: "max-content" }}
                    breakpoints={{
                         280: {
                              slidesPerView: 2,
                              spaceBetween: 10
                         },
                         576: {
                              slidesPerView: 3,
                              spaceBetween: 10
                         },
                         768: {
                              slidesPerView: 4,
                              spaceBetween: 10
                         },
                         992: {
                              slidesPerView: 3,
                         }
                    }}
               >
                    {children}
               </Swiper>
          </Box>
     );
};

export default AutoSwiper;