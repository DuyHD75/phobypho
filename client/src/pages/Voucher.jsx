import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import uiConfigs from "../configs/ui.config";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import VoucherFeatures from "../components/common/VoucherFeatures";
import VoucherRewards from "../components/common/VoucherRewards";
import VoucherPointExchange from "../components/common/VoucherPointExchange";
import VoucherUserPanner from "../components/common/VoucherUserPanner";

const Voucher = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <Fragment>
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
        <Box
          sx={{
            marginTop: "92.31px",
            paddingTop: {
              xs: "130%",
              sm: "80%",
              md: "60%",
              lg: "40%",
            },
            position: "relative",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/banner%2FScreenshot%202024-06-13%20134800.png?alt=media&token=a12dcdfc-382e-45f3-9223-44de2dbd1428)`,
            ':before': user && {
              content: '""',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.7)',
              width: '100%',
              height: '100%',
              top: 0,
              zIndex: 1,
            }
          }}
        >
          {user && (<VoucherUserPanner />)}
        </Box>
        <VoucherRewards />
        <VoucherFeatures />
        <VoucherPointExchange />
      </Box>
    </Fragment >
  );
};

export default Voucher;
