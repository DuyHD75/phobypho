import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReceiveVoucherModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo";
import {
  Stack,
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  Button,
  IconButton,
} from "@mui/material";
import uiConfigs from "../../configs/ui.config";
import LinearProgress from "@mui/material/LinearProgress";
import VoucherGetCode from "./VoucherGetCode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxWidth: "500px",
};

const ReceiveVouchersModal = () => {
  const dispatch = useDispatch();
  const { receiveVoucherModalOpen, userPoint, point, code } = useSelector(
    (state) => state.authModal
  );
  const progressValue = (userPoint / point) * 100;

  const handleCloseModal = () => {
    dispatch(setReceiveVoucherModalOpen(false));
  };

  const [voucherMessage, setVoucherMessage] = useState(null);
  const [showVoucher, setShowVoucher] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);

  const handleButtonClick = () => {
    if (userPoint >= point) {
      setVoucherMessage("success");
      setCodeSuccess(true);
    } else {
      setVoucherMessage("fail");
    }
    setShowVoucher(true);
  };

  const resetShowVoucher = () => {
    setShowVoucher(false);
    setCodeSuccess(false);
    setVoucherMessage(null)
  };

  // set up message
  const messageComponent = null;
  if (voucherMessage === "success") {
    messageComponent = (
      <Typography
        fontWeight="400"
        fontSize={"1rem"}
        fontStyle={"italic"}
        color={"#65ff26"}
        sx={{
          ...uiConfigs.style.typoLines(2, "left"),
        }}
      >
        Copy mã trên áp dụng vào hoá đơn
      </Typography>
    );
  } else if (voucherMessage === "fail") {
    messageComponent = (
      <Typography
        fontWeight="400"
        fontSize={"1rem"}
        fontStyle={"italic"}
        color={"#ff0000"}
        sx={{
          ...uiConfigs.style.typoLines(2, "left"),
        }}
      >
        Bạn không đủ điểm để nhận voucher
      </Typography>
    );
  }

  return (
    <Modal
      open={receiveVoucherModalOpen}
      onClose={() => {
        handleCloseModal();
        resetShowVoucher(); // Reset state showVoucher when modal closes
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box position={"relative"} sx={style}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: "background.paper",
          }}
        >
          <Box marginBottom={2}>
            <Typography
              color={"#c48f56"}
              fontSize="2rem"
              fontWeight={600}
              textTransform={"uppercase"}
              sx={{
                ...uiConfigs.style.typoLines(2, "center"),
              }}
            >
              receive vouchers
            </Typography>
          </Box>
          <Stack rowGap={3}>
            <Typography
              fontWeight="800"
              fontSize="2rem"
              textAlign={"center"}
              sx={{
                ...uiConfigs.style.typoLines(2, "center"),
              }}
            >
              {point} points
            </Typography>
            <Stack rowGap={2}>
              <Typography
                fontWeight="800"
                fontSize="1.1rem"
                textAlign={"left"}
                sx={{
                  ...uiConfigs.style.typoLines(2, "left"),
                }}
              >
                You have {userPoint}/ {point} points
              </Typography>
              <LinearProgress variant="determinate" value={progressValue} />
            </Stack>
            <Stack>
              <Typography
                fontWeight="800"
                fontSize="1.1rem"
                textAlign={"left"}
                sx={{
                  ...uiConfigs.style.typoLines(2, "left"),
                }}
              >
                Note:
              </Typography>

              <Typography
                fontWeight="300"
                fontSize={"0.9rem"}
                fontStyle={"italic"}
                sx={{
                  ...uiConfigs.style.typoLines(5, "left"),
                }}
              >
                <span>&#8226;</span> This voucher is valid for in-store
                purchases only.
                <br /> <span>&#8226;</span> Ensure to present the voucher before
                completing the transaction.
                <br /> <span>&#8226;</span> Voucher redemption is subject to
                availability and terms and conditions.
              </Typography>
            </Stack>
            <Stack>
              {codeSuccess && (
                <Typography
                  fontWeight="400"
                  fontSize={"1.6rem"}
                  sx={{
                    ...uiConfigs.style.typoLines(2, "left"),
                  }}
                >
                  Voucher code: {code}
                </Typography>
              )}
            </Stack>
            <Stack>
              <Button
                onClick={handleButtonClick}
                size="large"
                variant="contained"
                sx={{
                  fontFamily: "Saira Condensed",
                  fontWeight: "500",
                  marginTop: "15px",
                  padding: "10px 50px",
                  borderRadius: "9999px",
                  fontSize: "1.2rem",
                }}
              >
                Receive voucher
              </Button>
            </Stack>
            <Stack>{messageComponent}</Stack>
          </Stack>
        </Box>

        {showVoucher && <VoucherGetCode type={voucherMessage} />}
      </Box>
    </Modal>
  );
};

export default ReceiveVouchersModal;
