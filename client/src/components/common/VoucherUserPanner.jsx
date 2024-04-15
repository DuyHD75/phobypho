import React, { Fragment } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WalletIcon from "@mui/icons-material/Wallet";
import uiConfigs from "../../configs/ui.config";
function VoucherUserPanner() {
  const { user } = useSelector((state) => state.user);
  return (
    <Fragment>
      <Stack
        spacing={2}
        sx={{
          width: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Stack>
          <Typography
            variant="h4"
            fontSize={{ xs: "1.8rem", md: "1.8rem", lg: "2rem" }}
            fontWeight="600"
            sx={{
              ...uiConfigs.style.typoLines(2, "center"),
            }}
          >
            Hello, welcome back
          </Typography>
          <Typography
            variant="h4"
            fontSize={{ xs: "3rem", md: "3rem", lg: "4.2rem" }}
            fontWeight="800"
            sx={{
              ...uiConfigs.style.typoLines(2, "center"),
            }}
          >
            {user.displayName}
          </Typography>
        </Stack>
        <Stack borderTop="3px dotted #fff" paddingTop="16px" width={"100%"}>
          <Typography
            variant="h4"
            fontSize={{ xs: "1.8rem", md: "1.8rem", lg: "2rem" }}
            fontWeight="600"
            sx={{
              ...uiConfigs.style.typoLines(2, "center"),
            }}
          >
            You are
          </Typography>
          <Typography
            variant="h4"
            fontSize={{ xs: "3rem", md: "3rem", lg: "4rem" }}
            fontWeight="800"
            sx={{
              ...uiConfigs.style.typoLines(2, "center"),
            }}
          >
            5000 Points
          </Typography>
        </Stack>
        <Stack rowGap={3}>
          <Button
            size="large"
            variant="contained"
            sx={{
              fontFamily: "Saira Condensed",
              fontWeight: "500",
              marginY: "15px",
              padding: "10px 0px",
              borderRadius: "9999px",
              fontSize: "1rem",
              width: "340px",
              margin: "auto",
            }}
          >
            <AccessTimeIcon
              sx={{
                fontSize: "1.8rem",
                marginRight: "0.5rem",
              }}
            />
            History of receiving rewards
          </Button>
          <Button
            size="large"
            variant="contained"
            sx={{
              fontFamily: "Saira Condensed",
              fontWeight: "500",
              marginY: "15px",
              padding: "10px 50px",
              borderRadius: "9999px",
              fontSize: "1rem",
              width: "340px",
              margin: "auto",
            }}
          >
            <WalletIcon
              sx={{
                fontSize: "1.8rem",
                marginRight: "0.5rem",
              }}
            />
            Your coupon wallet
          </Button>
        </Stack>
      </Stack>
    </Fragment>
  );
}

export default VoucherUserPanner;
