import React, { Fragment, useState, useCallback } from "react";
import {
  Stack,
  Typography,
} from "@mui/material";
import ConfirmModal from "./ConfirmModal";
import ServicePackageItem from "./ServicePackageItem";
const ServicePackage = ({ photo, services }) => {


  const [openModal, setOpenModal] = useState(false);
  const [bookingData, setBookingData] = useState({ photo: photo });

  services = services.sort((a, b) => a.price - b.price);

  const handleCardAction = useCallback((service_id) => {
    setOpenModal(true);
    const service = services.find((e) => e._id === service_id);

    setBookingData({ ...bookingData, service_package: service });
  }, []);

  return (
    <Fragment>
      <ConfirmModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        setBookingData={setBookingData}
        bookingData={bookingData}
      />

      <Stack spacing={3} direction={"column"} padding={"1rem 0"}>
        {services.map((item, index) => (
          <Fragment key={index}>

            <ServicePackageItem
              service={item}
              handleCardAction={handleCardAction}
            />
          </Fragment>
        ))}
      </Stack>
    </Fragment>
  );
};

export default ServicePackage;
