import React, { Fragment, useState, useCallback } from "react";
import {
  Stack,
} from "@mui/material";
import ConfirmModal from "./ConfirmModal";
import ServicePackageItem from "./ServicePackageItem";

const ServicePackage = ({ photo, services }) => {

  console.log(services)
  const [openModal, setOpenModal] = useState(false);
  const [bookingData, setBookingData] = useState({ photo: photo });

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
          <ServicePackageItem
            key={index}
            service={item}
            index={index}
            handleCardAction={handleCardAction}
          />
        ))}
      </Stack>
    </Fragment>
  );
};

export default ServicePackage;
