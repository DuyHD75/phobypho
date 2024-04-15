import React, { Fragment } from "react";
import { Box, Grid, Typography, Stack, Paper, Button } from "@mui/material";
import uiConfigs from "../../configs/ui.config";

function VoucherGiftItems() {
  const giftList = {
    items: [
      {
        id: 1,
        name: "ColosGold plush panda bear",
        image:
          "https://cdn.shopify.com/s/files/1/0761/8769/7443/files/G_u.png?v=1700733034&width=600&crop=center",
        point: 55000,
        quantity: 5264,
        limited: 15,
      },
      {
        id: 2,
        name: "YOKOGOLD stuffed elephant",
        image:
          "https://cdn.shopify.com/s/files/1/0761/8769/7443/files/781693.png?v=1700733068&width=600&crop=center",
        point: 570000,
        quantity: 5003,
        limited: 15,
      },
      {
        id: 3,
        name: "COLOSGOLD panda-shaped comfortable pillow for babies",
        image:
          "https://cdn.shopify.com/s/files/1/0761/8769/7443/files/G_IG_UTRUCCOLOS.png?v=1700733677&width=600&crop=center",
        point: 55000,
        quantity: 3020,
        limited: 15,
      },
      {
        id: 4,
        name: "YOKOGOLD elephant-shaped comfortable pillow for babies",
        image:
          "https://cdn.shopify.com/s/files/1/0761/8769/7443/files/G_IVOIYOKO.png?v=1700733364&width=600&crop=center",
        point: 70000,
        quantity: 230,
        limited: 10,
      },
      {
        id: 5,
        name: "Baby walker gifts for little ones",
        image:
          "https://cdn.shopify.com/s/files/1/0761/8769/7443/files/Xe-d_y.png?v=1700639204&width=600&crop=center",
        point: 250000,
        quantity: 431,
        limited: 5,
      },
    ],
  };

  return (
    <Fragment>
      <Grid container rowSpacing={5} columnSpacing={3} paddingX="50px">
        {giftList.items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Stack
              sx={{
                border: "1px solid transparent",
                padding: "18px",
                textAlign: "center",
                borderRadius: "20px",

                alignItems: "center",
                flexDirection: "column",
                "&:hover": {
                  border: "1px solid #c48f56",
                },
              }}
            >
              <Box
                marginY={3}
                padding={2}
                border={"1px solid rgba(196, 143, 86, 0.4) "}
                borderRadius={"20px"}
              >
                <img src={item.image} style={{ width: "250px" }} alt="" />
              </Box>
              <Stack spacing={2} paddingX={3} marginBottom={2}>
                <Typography
                  textAlign={"left"}
                  sx={{
                    ...uiConfigs.style.typoLines(2, "left"),
                  }}
                >
                  still {item.quantity} gifts
                </Typography>
                <Typography
                  textAlign={"left"}
                  fontSize={"1.2rem"}
                  fontWeight={"600"}
                  sx={{
                    ...uiConfigs.style.typoLines(2, "left"),
                  }}
                >
                  [This give not sales] {item.name} gifts
                </Typography>
                <Typography
                  textAlign={"left"}
                  fontSize={"1.4rem"}
                  fontWeight={"800"}
                  sx={{
                    ...uiConfigs.style.typoLines(2, "left"),
                  }}
                >
                  {item.point} points
                </Typography>
                <Typography
                  textAlign={"left"}
                  fontStyle={"italic"}
                  sx={{
                    ...uiConfigs.style.typoLines(2, "left"),
                  }}
                >
                  Limit {item.limited} exchanges/customer
                </Typography>
              </Stack>
              <Button
                size="large"
                sx={{
                  width: "100%",
                  fontFamily: "Saira Condensed",
                  border: "1px solid #c48f56",
                  fontSize: "1rem",
                  fontWeight: "500",
                  marginY: "15px",
                  padding: "10px 50px",
                  borderRadius: "9999px",
                  "&:hover": {
                    backgroundColor: " #c48f56",
                    color: "#fff",
                    transition: "background-color 0.3s ease",
                  },
                }}
              >
                Login Now
              </Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}

export default VoucherGiftItems;
