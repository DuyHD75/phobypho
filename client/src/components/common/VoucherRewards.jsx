import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import VoucherFeaturesItems from "./VoucherFeaturesItems";
import VoucherRewardsItems from "./VoucherRewardsItems";

function VoucherRewards() {
  return (
    <Box sx={{ background: "#131313"   }}>
      <Box
        maxWidth={"1280px"}
        margin={"auto"}
        sx={{
          textAlign: "center",
          marginY: "20px",
          paddingY: "100px",
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
          Completed receiving rewards
        </Typography>
        <VoucherRewardsItems />
      </Box>
    </Box>
  );
}

export default VoucherRewards;
