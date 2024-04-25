import React, { Fragment } from "react";
import {
  Box,
  Button,
  Grid,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import uiConfigs from "../../configs/ui.config";
import { phobyphoDeals } from "../../asset/data";


function VoucherFeaturesItems() {


  return (
    <Fragment>
      <Stack
        flexDirection={{ sx: "column", md: "row" }}
        justifyContent={"space-around"}
      >
        {phobyphoDeals.deals.map((deal) => (
          <Box
            key={deal.id}
            flexDirection={"column"}
            display={"flex"}
            width={{ xs: "100%", md: "24%" }}
            marginY={{ xs: "20px" }}
            sx={{
              border: '1px solid #2D89E5',
              padding: '10px',
              borderRadius: '20px 0 20px',
              transition: 'all 0.8 ease-in-out',
              "&:hover": {
                transform: 'translateY(10px)',
              }
            }}
          >
            <Box>
              <Typography
                sx={{
                  padding: "12px 24px",
                  textAlign: "center",
                  position: "relative",
                  color: 'secondary.contrastText',
                  "::before": {
                    content: '""',
                    position: "absolute",
                    width: "50px",
                    height: "50px",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "9999px",
                    border: "4px dotted #2D89E5",
                  },
                }}
              >
                {deal.id}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  ...uiConfigs.style.typoLines(1, "center"),
                  fontSize: "1.2rem",
                  fontWeight: '700',
                  marginTop: "2rem",
                  color: 'secondary.contrastText',
                }}
              >
                {deal.title}
              </Typography>
            </Box>
            <Stack
              sx={{}}
              spacing={3}
              paddingTop={"14px"}
              marginX={{ xs: "60px", md: "0px" }}
            >
              <Typography
                fontSize={"1rem"}
                variant="p"
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  color: '#AEBACB'
                }}
              >
                {deal.description}
              </Typography>

              <Typography
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  color: 'secondary.main',
                  textShadow: '1px 1px 1px #000',
                }}
              >{deal.offer}</Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Fragment>
  );
}

export default VoucherFeaturesItems;
