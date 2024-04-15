import React, { Fragment } from "react";
import { Box, Typography, Button } from "@mui/material";
import VoucherGiftItems from "./VoucherGiftItems";

function VoucherGiftExchange() {
  return (
    <Box sx={{ background: "#131313" }}>
      <Box
        maxWidth={"1280px"}
        margin={"auto"}
        sx={{
          textAlign: "center",
        
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
          exchange points for gifts
        </Typography>
        <VoucherGiftItems />
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
          View all gifts
        </Button>
      </Box>
    </Box>
  );
}

export default VoucherGiftExchange;
