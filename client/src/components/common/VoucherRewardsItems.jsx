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

function VoucherRewardsItems() {
  const phobyphoRewards = {
    rewards: [
      {
        id: 1,
        title: "Reward on Sign-up",
        description: "Receive 5,000 points",
        image:
          "https://cdn.shopify.com/oxygen-v2/24008/7993/16198/412996/build/_assets/signup-HA56PKUV.svg",
      },
      {
        id: 2,
        title: "Earn Points on Order",
        description: "Receive 2-4% spending",
        image:
          "https://cdn.shopify.com/oxygen-v2/24008/7993/16198/412996/build/_assets/placeOrder-WS7XJ6TD.svg",
      },
      {
        id: 3,
        title: "Reward on Completing Order",
        description: "Reward 2,000 - 3,000 points",
        image:
          "https://cdn.shopify.com/oxygen-v2/24008/7993/16198/412996/build/_assets/firstOrder-NDYT74BD.svg",
      },
    ],
  };

  return (
    <Fragment>
      <Stack
        flexDirection={{ sx: "column", md: "row" }}
        justifyContent={"center"}
        alignItems={"center"}
        gap={8}
      >
        {phobyphoRewards.rewards.map((reward) => {
          return (
            <Box
              key={reward.id}
              flexDirection={"row"}
              display={"flex"}
              width={{ xs: "50%", md: "26%" }}
              padding={"1rem"}
              backgroundColor={"#89643c"}
              borderRadius={"20px"}
            >
              <img
                src={reward.image}
                style={{ marginRight: "15px", width: "90px" }}
                alt=""
              />
              <Stack justifyContent={"center"}>
                <Typography
                  variant="h4"
                  fontSize={"1.4rem"}
                  fontWeight="600"
                  textAlign={"left"}
                  sx={{
                    ...uiConfigs.style.typoLines(2, "left"),
                  }}
                >
                  {reward.title}
                </Typography>
                <Typography
                  fontWeight="400"
                  textAlign={"left"}
                  sx={{
                    ...uiConfigs.style.typoLines(2, "left"),
                  }}
                >
                  {reward.description}
                </Typography>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Fragment>
  );
}

export default VoucherRewardsItems;
