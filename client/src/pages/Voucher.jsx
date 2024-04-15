import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import uiConfigs from "../configs/ui.config";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import VoucherFeatures from "../components/common/VoucherFeatures";
import VoucherRewards from "../components/common/VoucherRewards";
import VoucherPointExchange from "../components/common/VoucherPointExchange";
import VoucherGiftExchange from "../components/common/VoucherGiftExchange";
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
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundImage: `url(https://promo-theme.com/novo/wp-content/uploads/2017/08/slide1.jpg)`,
            position: "relative",
          }}
        >
          {!user ? (
            <Box
              spacing={6}
              sx={{
                width: "70%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                fontSize={{ xs: "2rem", md: "2rem", lg: "3rem" }}
                fontWeight="600"
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                }}
              >
                Phobypho
              </Typography>
              <Typography
                variant="h4"
                fontSize={{
                  xs: "3rem",
                  md: "3rem",
                  lg: "5rem",
                  textTransform: "uppercase",
                }}
                fontWeight="800"
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  marginY: 1,
                }}
              >
                Capturing Cherished Memories Through the Lens of Time
              </Typography>
              <Button
                size="large"
                variant="contained"
                sx={{
                  fontFamily: "Saira Condensed",
                  fontWeight: "500",
                  marginY: "15px",
                  padding: "10px 50px",
                  borderRadius: "9999px",
                  fontSize: "1.2rem",
                }}
                onClick={() => dispatch(setAuthModalOpen(true))}
              >
                Login Now
              </Button>
            </Box>
          ) : (
            <VoucherUserPanner />
          )}
        </Box>
        <VoucherFeatures />
        <VoucherRewards />
        <VoucherPointExchange />
        <VoucherGiftExchange />
      </Box>
    </Fragment>
  );
};

export default Voucher;
