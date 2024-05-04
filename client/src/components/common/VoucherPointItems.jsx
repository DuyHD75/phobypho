import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, Stack, Paper, Button } from "@mui/material";

import uiConfigs from "../../configs/ui.config";
import {
  setAuthModalOpen,
  setReceiveVoucherModalOpen,
} from "../../redux/features/authModalSlice";

import voucherApi from "../../api/modules/voucher.api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customerApi from "../../api/modules/customer.api";


const VoucherPointItems = ({vouchers,  customerInfo}) => {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
 

  return (
    <Fragment>
      <Grid
        container
        spacing={{ sx: '0', md: '3' }}
      >
        {vouchers.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Stack
                sx={{
                  border: "1px solid transparent",
                  padding: "2rem",
                  textAlign: "center",
                  borderRadius: "1rem",
                  "&:hover": {
                    border: "2px solid #2D89E5",
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      backgroundColor: "#2D89E5",
                      padding: "1rem",
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
                    />
                    <Typography
                      fontWeight="800"
                      fontSize="2rem"
                      textAlign={"left"}
                      sx={{
                        ...uiConfigs.style.typoLines(1, "left"),
                        color: 'secondary.contrastText',
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      fontWeight="600"
                      fontSize="1.5rem"
                      textAlign={"left"}
                      sx={{
                        ...uiConfigs.style.typoLines(1, "left"),
                      }}
                    >
                      {item.price}
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
                        color: 'primary.headerColor',
                        textShadow: '1px 1px 1px #000',
                      }}
                    >
                      Ngày hết hạn: {dayjs(item.expirationDate).format("DD/MM/YYYY")}
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

                      {`${item.pointsRequired.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} points
                    </Typography>

                    <Typography
                      textAlign={"left"}
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left"),
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Stack>
                  {!user ? (
                    <Button
                      size="large"
                      sx={{
                        width: "100%",
                        ...uiConfigs.style.typoLines(1, 'center'),
                        border: "1px solid #2D89E5",
                        fontSize: "0.9rem",
                        width: 'fit-content',
                        position: 'relative',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: "10px 30px",
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: " #2D89E5",
                          color: "#fff",
                          transition: "background-color 0.3s ease",
                        },
                      }}
                      onClick={() => dispatch(setAuthModalOpen(true))}
                    >
                      Đăng nhập
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      sx={{
                        width: "100%",
                        ...uiConfigs.style.typoLines(1, 'center'),
                        border: "1px solid #2D89E5",
                        fontSize: "0.9rem",
                        width: 'fit-content',
                        position: 'relative',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: "10px 30px",
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: " #2D89E5",
                          color: "#fff",
                          transition: "background-color 0.3s ease",
                        },
                      }}
                      onClick={() =>
                        dispatch(
                          setReceiveVoucherModalOpen({
                            isOpen: true,
                            customerPoints: customerInfo.accumulated_points,
                            voucher: item
                          })
                        )
                      }
                    >
                      Đổi ngay
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
