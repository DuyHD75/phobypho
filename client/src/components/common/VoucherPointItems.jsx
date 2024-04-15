import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, Stack, Paper, Button } from "@mui/material";

import uiConfigs from "../../configs/ui.config";
import {
  setAuthModalOpen,
  setReceiveVoucherModalOpen,
} from "../../redux/features/authModalSlice";

const voucherList = {
  items: [
    {
      id: 1,
      name: "Voucher 13K",
      price: 13000,
      point: 9000,
      code: "VOUCHER13K",
    },
    {
      id: 2,
      name: "Voucher 26K",
      price: 26000,
      point: 18000,
      code: "VOUCHER26K",
    },
    {
      id: 3,
      name: "Voucher 40K",
      price: 40000,
      point: 28000,
      code: "VOUCHER40k",
    },
    {
      id: 4,
      name: "Voucher 50K",
      price: 50000,
      point: 37000,
      code: "VOUCHER50K",
    },
    {
      id: 5,
      name: "CGV 2D movie tickets",
      price: 120000,
      point: 75000,
      code: "VOUCHER_CGV_2D",
    },
    {
      id: 6,
      name: "Evoucher Tiniworld 200K",
      price: 150000,
      point: 150000,
      code: "VOUCHER_TINIWORLD",
    },
  ],
};

function VoucherPointItems() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userPoint = 9000;
  return (
    <Fragment>
      <Grid
        container
        rowSpacing={5}
        columnSpacing={3}
        justifyContent="center"
        paddingX="50px"
      >
        {voucherList.items.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Stack
                sx={{
                  border: "1px solid transparent",
                  padding: "26px",
                  textAlign: "center",
                  borderRadius: "20px",
                  "&:hover": {
                    border: "1px solid #c48f56",
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      backgroundColor: "#c48f56",
                      padding: "18px 18px",
                      borderRadius: "20px",
                    }}
                  >
                    <Paper
                      sx={{
                        height: "5px",
                        background:
                          "repeating-linear-gradient(to right, #fff 0, #fff 6px, rgba(255, 255, 255, 0) 6px, rgba(255, 255, 255, 0) 12px)",
                        boxShadow: "none",
                        marginBottom: "12px",
                      }}
                    ></Paper>
                    <Typography
                      fontWeight="800"
                      fontSize="2rem"
                      textAlign={"left"}
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left"),
                      }}
                    >
                      Voucher
                    </Typography>
                    <Typography
                      fontWeight="600"
                      fontSize="1.5rem"
                      textAlign={"left"}
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left"),
                      }}
                    >
                      {item.price} VND
                    </Typography>
                    <Paper
                      sx={{
                        height: "5px",
                        background:
                          "repeating-linear-gradient(to right, #fff 0, #fff 6px, rgba(255, 255, 255, 0) 6px, rgba(255, 255, 255, 0) 12px)",
                        boxShadow: "none",
                        marginTop: "12px",
                      }}
                    ></Paper>
                  </Box>
                  <Stack
                    spacing={1}
                    sx={{
                      paddingY: "24px",
                    }}
                  >
                    <Typography
                      textAlign={"left"}
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left"),
                      }}
                    >
                      Unlimited
                    </Typography>
                    <Typography
                      textAlign={"left"}
                      fontSize={"1.8rem"}
                      fontWeight={"800"}
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left"),
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Stack>
                </Box>
                <Box>
                  <Stack spacing={3} marginBottom={"20px"}>
                    {/* LOGIN */}

                    <Typography
                      fontWeight="800"
                      fontSize="1.3rem"
                      textAlign={"left"}
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left"),
                      }}
                    >
                      {item.point} points
                    </Typography>

                    <Typography
                      textAlign={"left"}
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left"),
                      }}
                    >
                      *Voucher is only valid when purchasing on website
                      Phobypho.com.vn and only applies during the validity
                      period of the voucher
                    </Typography>
                  </Stack>
                  {!user ? (
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
                      onClick={() => dispatch(setAuthModalOpen(true))}
                    >
                      Login Now
                    </Button>
                  ) : (
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
                      onClick={() =>
                        dispatch(
                          setReceiveVoucherModalOpen({
                            isOpen: true,
                            userPoint,
                            point: item.point,
                            code: item.code
                          })
                        )
                      }
                    >
                      get voucher
                    </Button>
                  )}
                </Box>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
}

export default VoucherPointItems;
