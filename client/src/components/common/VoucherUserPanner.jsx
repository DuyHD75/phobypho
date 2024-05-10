import React, { Fragment, useState, useEffect } from "react";
import { Box, Typography, Stack, Button, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WalletIcon from "@mui/icons-material/Wallet";
import uiConfigs from "../../configs/ui.config";
import customerApi from "../../api/modules/customer.api";
import { toast } from "react-toastify";
import { BiSolidDiscount } from "react-icons/bi";
import zIndex from "@mui/material/styles/zIndex";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  backgroundColor: '#f5f7fa',
  backgroundImage: `url(https://us-wn-g.gr-cdn.com/_next/static/media/bg3.d94446d2.svg), url(https://us-wn-g.gr-cdn.com/_next/static/media/bg1.0d1d3b37.svg), url(https://us-wn-g.gr-cdn.com/_next/static/media/bg2.ad4bd4bc.svg)`,
  backgroundPosition: 'calc(50% - 418px) -30px, calc(50% - 357px) -370px, calc(50% + 570px) -170px',
  backgroundSize: '1742px 1742px,1210px 1210px,1665px 1665px',
  color: 'secondary.colorText',
  boxShadow: 24,
  p: 4,
  maxWidth: '500px',
  maxHeight: '500px',
  overflowY: 'scroll',
  zIndex: 100
};


const VouchersModal = ({ isOpenVoucherModal, handleCloseModal, vouchers }) => {
  return (
    <Modal
      open={isOpenVoucherModal}
      onClose={() => handleCloseModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography sx={{
          ...uiConfigs.style.typoLines(2, "center"),
          color: 'primary.main',
          textTransform: 'Capitalize',
          textShadow: '1px 1px 1px #000',
          fontSize: '1.2rem'
        }}> Danh sách voucher của bạn</Typography>
        {(vouchers && vouchers.length > 0) ? vouchers.map((voucher, index) => (
          <Stack key={index} flexDirection={'row'} alignItems={"center"} sx={{ border: '2px dashed #000', marginTop: '1rem' }} >
            <Box sx={{ width: '25%', display: 'flex', justifyContent: 'center' }}  >
              <BiSolidDiscount style={{ fontSize: '3rem', color: '#2D89E5' }} />
            </Box>
            <Stack flexDirection={'row'} alignItems={"center"} justifyContent={'space-between'} flex={1} flexGrow={1}>
              <Typography sx={{ ...uiConfigs.style.typoLines(1, "center"), borderLeft: '1px solid #000', padding: '0 10px' }}>{voucher.name}</Typography>
              <Typography sx={{ ...uiConfigs.style.typoLines(1, "center"), borderLeft: '1px solid #000', padding: '0 10px' }}>{`${voucher.value}%`}</Typography>
              <Typography sx={{ ...uiConfigs.style.typoLines(1, "center"), borderLeft: '1px solid #000', padding: '0 10px' }}>{voucher.code}</Typography>
            </Stack>
          </Stack>
        )) : (
          <Typography sx={{
            ...uiConfigs.style.typoLines(1, "center"),
            textTransform: 'capitalize',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BiSolidDiscount style={{ fontSize: '3rem', color: '#2D89E5' }} />
            Bạn Chưa có voucher nào
          </Typography>
        )}

      </Box>
    </Modal>
  );
};




function VoucherUserPanner() {
  const { user } = useSelector((state) => state.user);
  const [customerInfo, setCustomerInfo] = useState({});
  const [vouchers, setVouchers] = useState([]);
  const [isOpenVouchersModal, setIsOpenVouchersModal] = useState(false);


  useEffect(() => {

    const getCustomerVouchers = async () => {
      const { response, err } = await customerApi.getCustomerVouchers();
      if (err) return toast.error(err);
      setVouchers(response);
    }

    const getCustomerInfo = async () => {
      const { response, err } = await customerApi.getCustomerByAccountId();
      if (err) return toast.error(err);
      setCustomerInfo(response);
      getCustomerVouchers();
    };
    getCustomerInfo();
  }, []);



  return (
    <Fragment>
      <VouchersModal isOpenVoucherModal={isOpenVouchersModal} handleCloseModal={setIsOpenVouchersModal} vouchers={vouchers.vouchers} />
      {customerInfo && (
        <Stack
          spacing={2}
          sx={{
            width: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            alignItems: "center",
            padding: '3rem',
            zIndex: 100
          }}
        >
          <Stack>
            <Typography
              variant="h4"
              fontSize={{ xs: "1.2rem", md: "1.8rem", lg: "2rem" }}
              fontWeight="600"
              sx={{
                ...uiConfigs.style.typoLines(2, "center"),
                textTransform: "capitalize",
              }}
            >
              Chào mừng bạn quay trở lại
            </Typography>
            <Typography
              variant="h4"
              fontSize={{ xs: "2rem", md: "2.6rem", lg: "3rem" }}
              fontWeight="800"
              sx={{
                ...uiConfigs.style.typoLines(2, "center"),
                color: '#ffff',
                textTransform: "capitalize",
                textShadow: "1px 1px 1px #000",
              }}
            >
              {user.displayName}
            </Typography>
          </Stack>


          {customerInfo.accumulated_points > 0 ? (
            <Stack paddingTop="16px" width={"100%"}>
              <Typography
                variant="h4"
                fontSize={{ xs: "1rem", md: "1.4rem", lg: "1.6rem" }}
                fontWeight="600"
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                }}
              >
                Tổng điểm tích lũy
              </Typography>

              <Typography
                variant="h4"
                fontSize={{ xs: "2.4rem", md: "2.6rem", lg: "3rem" }}
                fontWeight="800"
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  textTransform: "capitalize",
                  color: '#fff'
                }}
              >
                {customerInfo.accumulated_points.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} điểm
              </Typography>
            </Stack>


          ) : (

            <Typography
              variant="h4"
              fontSize={{ xs: "1rem", md: "1.4rem", lg: "1.6rem" }}
              fontWeight="600"
              sx={{
                ...uiConfigs.style.typoLines(2, "center"),
                textTransform: "capitalize",
              }}
            >
              Bạn Chưa có điểm nào
            </Typography>



          )}

          <Button
            size="small"
            variant="contained"
            sx={{
              ...uiConfigs.style.typoLines(1, "center"),
              borderRadius: "10px",
              fontSize: "0.9rem",
              width: "fit-content",
              padding: '10 10px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            startIcon={<AccessTimeIcon
              sx={{
                fontSize: "2rem",
              }}
            />}
            onClick={() => setIsOpenVouchersModal(true)}
          >
            Voucher của bạn
          </Button>
        </Stack>)}
    </Fragment>
  );
}

export default VoucherUserPanner;
