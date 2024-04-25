import React, { Fragment } from "react";
import { Box,  Button } from "@mui/material";
import VoucherPointItems from "./VoucherPointItems";
import Container from './Container';
import uiConfigs from "../../configs/ui.config";

function VoucherPointExchange() {
  return (
    <Fragment>
      <Box paddingTop={'3rem'} sx={{ ...uiConfigs.style.mainContent }}>

        <Container
          header={"Đổi điểm thưởng"}
        >
          <VoucherPointItems />

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
