import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import photoApi from "../../api/modules/photo.api";
import { SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import AutoSwiper from "./AutoSwiper";
import PhotographerItem from "./PhotographerItem";
import { Typography } from "@mui/material";

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
        img: "https://promo-theme.com/novo/wp-content/uploads/2017/08/price-list2.jpg",
        title: "Bed",
      },
      {
        id: "2",
        img: "https://promo-theme.com/novo/wp-content/uploads/2019/08/price-list13.jpg",
        title: "Books",
      },
      {
        id: "3",
        img: "https://promo-theme.com/novo/wp-content/uploads/2019/08/price-list14.jpg",
        title: "Sink",
      },
      {
        id: "4",
        img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
        title: "Kitchen",
      },
    ];

    setPhotos(fetchedImageData);
  }, []);

  return (
    <Fragment>
      <AutoSwiper>
        {photos.map((photo, index) => (
          <SwiperSlide key={index} >
            <PhotographerItem photo={photo} />
          </SwiperSlide>
        ))}
      </AutoSwiper>
    </Fragment>
  );
};

export default PhotographerSlide;
