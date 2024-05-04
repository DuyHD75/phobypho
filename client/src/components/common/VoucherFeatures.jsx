import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import VoucherFeaturesItems from "./VoucherFeaturesItems";
import uiConfigs from "../../configs/ui.config";
import Container from "./Container";
function VoucherFeatures() {
  return (
    <Box sx={{ bgcolor: '#1b2935' }}>
      <Box sx={{ ...uiConfigs.style.mainContent, padding: '3rem' }}>
        <Typography
          variant="p"
          sx={{
            color: '#99ccff',
            fontSize: { sx: '1.4rem', md: '1.6rem' },
            fontWeight: '800',
            textTransform: 'capitalize',
            ...uiConfigs.style.typoLines(1, 'left')
          }}>Các tính năng của voucher</Typography>
        <Container >
          <VoucherFeaturesItems />
        </Container>

      </Box>
    </Box >
  );
}

export default VoucherFeatures;
