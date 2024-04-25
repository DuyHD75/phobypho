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
import { toast } from "react-toastify";
import voucherApi from "../../api/modules/voucher.api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: '10px',
  border: "2px solid #444",
  color: "secondary.colorText",
  boxShadow: 24,
  p: 4,
  maxWidth: "500px",
};

const ReceiveVouchersModal = () => {
  const dispatch = useDispatch();
  const { receiveVoucherModalOpen, customerPoints, voucher } = useSelector((state) => state.authModal);

  const handleCloseModal = () => {
    dispatch(setReceiveVoucherModalOpen(false));
  };

  const [exchangeStatus, setExchangeStatus] = useState(undefined);
  const [showVoucher, setShowVoucher] = useState(false);
  const [messageResponse, setMessageResponse] = useState('');

  const handleExchangeVoucherBtn = async () => {
    try {
      if (voucher && customerPoints >= voucher.pointsRequired) {

        const { response, err } = await voucherApi.exchangeVoucher(voucher.id, voucher.pointsRequired);

        if (response) {
          setExchangeStatus(true);
          setMessageResponse(response.message);
          return;
        }
        else {
          const messageError = err.message;
          throw new Error(messageError.message);
        }
      } else {
        setExchangeStatus(false);
        setMessageResponse("Bạn không đủ điểm để đổi voucher!");
      }
    } catch (err) {
      setExchangeStatus(false);
      setMessageResponse(err.message);
    } finally {
      setShowVoucher(true);
    }
  };

  const resetShowVoucher = () => {
    setShowVoucher(false);
    setMessageResponse('');
    setExchangeStatus(undefined)
  };

  return (
    <Fragment>
      {voucher && (
        <Modal
          open={receiveVoucherModalOpen}
          onClose={() => {
            handleCloseModal();
            resetShowVoucher();
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
                  fontSize="1.4rem"
                  fontWeight={600}
                  textTransform={"uppercase"}
                  sx={{
                    ...uiConfigs.style.typoLines(1, "center"),
                  }}
                >
                  Đổi điểm lấy voucher
                </Typography>
              </Box>
              <Stack rowGap={3}>
                <Typography
                  fontWeight="800"
                  fontSize="1rem"
                  textAlign={"center"}
                  sx={{
                    ...uiConfigs.style.typoLines(2, "center"),
                  }}
                >
                  Bạn có {customerPoints ? ` ${customerPoints.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : 0} điểm
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
                    Tiến trình tích điểm {`${customerPoints.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}/ 
                    {` ${voucher.pointsRequired.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} điểm
                  </Typography>
                  <LinearProgress variant="determinate" value={(customerPoints / voucher.pointsRequired) * 100} />
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
                    Chú ý:
                  </Typography>

                  <Typography
                    fontWeight="300"
                    fontSize={"1rem"}
                    fontStyle={"italic"}
                    sx={{
                      ...uiConfigs.style.typoLines(5, "left"),
                      color: 'secondary.subText', 
                    }}
                  >
                    <span>&#8226;</span> Phiếu voucher này chỉ có giá trị cho các giao dịch trên hệ thống.
                    <br /> <span>&#8226;</span> Đảm bảo voucher còn trong thời hạn sử dụng.
                    <br /> <span>&#8226;</span> Không chia sẻ voucher cho người khác.
                  </Typography>
                </Stack>
                <Stack>
                  {exchangeStatus && (
                    <Box>
                      <Typography
                        fontSize={"1rem"}
                        sx={{
                          ...uiConfigs.style.typoLines(1, "center"),
                          color: 'red',
                          marginBottom: '5px',
                          borderRadius: '10px',
                          border: '1px solid red',
                          padding: '5px',
                        }}
                      >
                        {voucher.code}

                      </Typography>
                      <Typography sx={{
                        ...uiConfigs.style.typoLines(1, "center"),
                        color: 'green',
                        fontSize: '1rem',
                      }}>{'Copy mã này vào hóa đơn để được giảm giá !'}</Typography>
                    </Box>
                  )}

                  {!exchangeStatus && (
                    <Typography
                      fontSize={"0.9rem"}
                      color={"#780116"}
                      sx={{
                        ...uiConfigs.style.typoLines(1, "center"),
                        textTransform: "capitalize",
                      }}
                    >
                      {messageResponse}
                    </Typography>
                  )}
                </Stack>

                <Stack>
                  <Button
                    onClick={handleExchangeVoucherBtn}
                    size="small"
                    variant="contained"
                    disabled={exchangeStatus !== undefined}
                    sx={{
                      ...uiConfigs.style.typoLines(1, "center"),
                      width: 'fit-content',
                      position: "relative",
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "0.4rem 2rem",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                    }}
                  >
                    Nhận voucher
                  </Button>
                </Stack>
              </Stack>
            </Box>

            {showVoucher && <VoucherGetCode type={exchangeStatus} messageResponse={messageResponse} />}
          </Box>
        </Modal >
      )}

    </Fragment>
  );
};

export default ReceiveVouchersModal;
