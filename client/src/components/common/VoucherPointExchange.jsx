import React, { Fragment, useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import VoucherPointItems from "./VoucherPointItems";
import Container from './Container';
import uiConfigs from "../../configs/ui.config";
import voucherApi from "../../api/modules/voucher.api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customerApi from "../../api/modules/customer.api";
import { useDispatch, useSelector } from "react-redux";


function VoucherPointExchange() {



  const [vouchers, setVouchers] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(undefined);


  useEffect(() => {

    const getCustomerPoint = async () => {
      const { response, err } = await customerApi.getCustomerByAccountId();
      if (err) return toast.error(err);

      setCustomerInfo(response);
    }

    const getVoucherList = async () => {
      getCustomerPoint();
      const { response, err } = await voucherApi.getVouchers();
      if (err) {
        return toast.error('Truy cập dữ liệu thất bại');
      }
      setVouchers(response);
    };
    getVoucherList();
  }, []);




  return (





    <Fragment>
      <Box paddingTop={'3rem'} sx={{ ...uiConfigs.style.mainContent }}>

        <Container
          header={"Đổi điểm thưởng"}
        >
          <VoucherPointItems vouchers={vouchers} customerInfo={customerInfo}/>

          <Button
            size="small"
            variant="contained"
            sx={{
              ...uiConfigs.style.typoLines(1, "center"),
              fontSize: "0.9rem",
              marginTop: "40px",
              width: "fit-content",
              padding: "10px 30px",
              borderRadius: "9999px",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Xem thêm
          </Button>
        </Container>

      </Box>
    </Fragment>
  );
}

export default VoucherPointExchange;
