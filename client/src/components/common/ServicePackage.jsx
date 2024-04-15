import React, { Fragment, useState, useCallback } from "react";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Stack,
  Modal,
  Button,
} from "@mui/material";
import uiConfigs from "../../configs/ui.config";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { LoadingButton } from "@mui/lab";
import ConfirmModal from "./ConfirmModal";
import { useParams } from "react-router-dom";
import ServicePackageItem from "./ServicePackageItem";

const ServicePackage = ({ photo, services }) => {
  const [openModal, setOpenModal] = useState(false);
  const [bookingData, setBookingData] = useState({ photo_id: photo.id });

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

      <Stack spacing={3} direction={"column"} padding={"1rem 0.5rem"}>
        {services.map((item, index) => (
          <ServicePackageItem
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
