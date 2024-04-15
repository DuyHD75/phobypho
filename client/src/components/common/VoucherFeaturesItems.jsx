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

function VoucherFeaturesItems() {
  const phobyphoDeals = {
    deals: [
      {
        id: 1,
        title: "Sign Up",
        description: "Easily join the rewards program with your account.",
        offer: "Receive 5,000 points when signing up today.",
      },
      {
        id: 2,
        title: "Earn Points",
        description: "Get rewards for every order and activity participation.",
        offer: "Special offers when earning points.",
      },
      {
        id: 3,
        title: "Redeem Points & Enjoy",
        description:
          "Easily redeem points for discount coupons and free gifts.",
        offer: "Enjoy special offers when redeeming accumulated points.",
      },
    ],
  };

  return (
    <Fragment>
      <Stack
        flexDirection={{ sx: "column", md: "row" }}
        justifyContent={"center"}
        alignItems={{ xs: "center", md: "normal" }}
        gap={6}
      >
        {phobyphoDeals.deals.map((deal) => {
          return (
            <Box
              key={deal.id}
              flexDirection={"column"}
              display={"flex"}
              width={{ xs: "80%", md: "24%" }}
              marginY={{ xs: "20px" }}
            >
              <Box>
                <Typography
                  sx={{
                    padding: "12px 24px",
                    textAlign: "center",
                    position: "relative",
                    "::before": {
                      content: '""',
                      position: "absolute",
                      width: "50px",
                      height: "50px",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      borderRadius: "9999px",
                      border: "1px solid white",
                    },
                  }}
                >
                  {deal.id}
                </Typography>
                <Typography
                  variant="h4"
                  fontSize={"1.6rem"}
                  fontWeight="800"
                  marginY={{ xs: "20px", md: "36px" }}
                  height={"36px"}
                >
                  {deal.title}
                </Typography>
              </Box>
              <Stack
                sx={{ borderTop: "1px dotted white" }}
                spacing={3}
                paddingTop={"14px"}
                marginX={{ xs: "60px", md: "0px" }}
              >
                <Typography
                  fontSize={"1.2rem"}
                  height={{ xs: "30px", md: "55px" }}
                  sx={{
                    ...uiConfigs.style.typoLines(2, "center"),
                  }}
                >
                  {deal.description}
                </Typography>
                <Typography>{deal.offer}</Typography>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Fragment>
  );
}

export default VoucherFeaturesItems;
