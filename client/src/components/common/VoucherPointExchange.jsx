import React, { Fragment } from "react";
import { Box, Typography, Button } from "@mui/material";
import VoucherFeaturesItems from "./VoucherFeaturesItems";
import VoucherRewardsItems from "./VoucherRewardsItems";
import VoucherPointItems from "./VoucherPointItems";

function VoucherPointExchange() {
  return (
    <Fragment>
      <Box
        maxWidth={"1280px"}
        margin={"auto"}
        sx={{
          textAlign: "center",
          marginY: "20px",
          paddingY: "70px",
        }}
      >
        <Typography
          variant="h4"
          fontSize={{
            xs: "1.6rem",
            md: "2.5rem",
            lg: "2.5rem",
            textTransform: "uppercase",
          }}
          fontWeight="800"
          marginBottom="100px"
        >
          receive Voucher immediately!
        </Typography>
        <VoucherPointItems />
        <Button
          size="large"
          variant="contained"
          sx={{
            fontFamily: "Saira Condensed",
            fontSize: "1rem",
            fontWeight: "500",
            marginTop: "40px",
            padding: "10px 50px",
            borderRadius: "9999px",
          }}
        >
          View all vouchers
        </Button>
      </Box>
    </Fragment>
  );
}

export default VoucherPointExchange;
