import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import VoucherFeaturesItems from "./VoucherFeaturesItems";

function VoucherFeatures() {
  return (
    <Fragment>
      <Box
        maxWidth={"1280px"}
        margin={"auto"}
        sx={{ textAlign: "center", marginY: "80px" }}
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
          marginY="100px"
        >
          Enjoy the offers
        </Typography>
        <VoucherFeaturesItems />
      </Box>
    </Fragment>
  );
}

export default VoucherFeatures;
