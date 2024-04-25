import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import VoucherFeaturesItems from "./VoucherFeaturesItems";
import VoucherRewardsItems from "./VoucherRewardsItems";
import uiConfigs from "../../configs/ui.config";
import Container from "./Container";
function VoucherRewards() {
  return (

    <Box>
      <Box sx={{ ...uiConfigs.style.mainContent, padding: '4rem 3rem' }}>
        <Typography
          sx={{
            color: '#ffdc48',
            fontSize:{sx: '2rem', md: '1.6rem'},
            fontWeight: '800',
            textTransform: 'capitalize',
            ...uiConfigs.style.typoLines(2, 'left'),
            textShadow: '1px 1px 1px #000',
          }}>Các bước sử dụng voucher</Typography>

        <Container>

          <VoucherRewardsItems />

        </Container>
      </Box>
    </Box>
  );
}

export default VoucherRewards;
