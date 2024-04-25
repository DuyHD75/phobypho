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
        title: "Đăng ký tài khoản",
        description: "Nhận 1,000 điểm ",
        image:
          "https://cdn.shopify.com/oxygen-v2/24008/7993/16198/412996/build/_assets/signup-HA56PKUV.svg",
      },
      {
        id: 2,
        title: "Thanh Toán Hóa Đơn",
        description: "Nhận 1,000 điểm ",
        image:
          "https://cdn.shopify.com/oxygen-v2/24008/7993/16198/412996/build/_assets/placeOrder-WS7XJ6TD.svg",
      },
      {
        id: 3,
        title: "Hoàn Thành Đơn Hàng",
        description: "Nhận 2,000 - 3,000 điểm",
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
        paddingTop={'2rem'}
        alignItems={"center"}
        gap={8}
      >
        {phobyphoRewards.rewards.map((reward) => {
          return (
            <Box
              key={reward.id}
              flexDirection={"row"}
              justifyContent={{sx: 'space-between', md: 'space-around'}}
              display={"flex"}
              width={{ xs: "100%", md: "26%" }}
              padding={"1rem"}
              sx={{
                transition: "all 0.3s ease-in-out",
                borderRadius: "10px",
                border: "2px solid #2D89E5",
                overflow: "hidden",
                bgcolor: "#f5f5f5",
                "&:hover": {
                  cursor: "pointer",
                  transform: 'translateY(-10px)',
                }
              }}

            >
              <img
                src={reward.image}
                style={{ marginRight: "15px", width: "90px" }}
                alt=""
              />
              <Stack justifyContent={"center"}>
                <Typography
                  variant="h4"
                  fontSize={"1rem"}
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
    </Fragment >
  );
}

export default VoucherRewardsItems;
