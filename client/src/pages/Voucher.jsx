import React, { Fragment} from "react";
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
              <Typography sx={{
                ...uiConfigs.style.typoLines(1, 'center'),
                stroke: "#313131",
                strokeWidth: "1px",
                fontSize: { xs: "2rem", md: "3rem" },
                textShadow: "2px 2px 4px #000",
                color: 'primary.headerColor',
                textTransform: 'uppercase',
                fontWeight: "900",

              }}>PHOBYPHO</Typography>
              <Typography
                variant="h4"

                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  fontWeight: "800",
                  marginY: 1,
                  textTransform: "uppercase",
                  fontSize: {
                    xs: "0.9rem", md: "1.5rem", lg: "2.6rem",
                  }
                }}
              >
                Nhiều mã ưu đãi hấp dẫn áp dụng cho khách hàng thân thiết 
              </Typography>
              <Button
                size="small"
                variant="contained"
                sx={{
                  fontWeight: "500",
                  marginY: "15px",
                  padding: "10px 30px",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  marginX: "auto",
                  ...uiConfigs.style.typoLines(1, "center"),
                }}
                onClick={() => dispatch(setAuthModalOpen(true))}
              >
                Đăng nhập
              </Button>
            </Box>
          ) : (
            <VoucherUserPanner />
          )}
        </Box>
        <VoucherRewards />
        <VoucherFeatures />
        <VoucherPointExchange />
      </Box>
    </Fragment >
  );
};

export default Voucher;
