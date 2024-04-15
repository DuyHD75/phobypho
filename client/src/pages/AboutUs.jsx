import React, { Fragment } from "react";
import CameraIcon from "@mui/icons-material/Camera";
import {
  Box,
  Button,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import uiConfigs from "../configs/ui.config";
import Logo from "../components/common/Logo";
import { keyframes } from "@mui/system";
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

function AboutUs() {
  return (
    <Fragment>
      <Box
        sx={{
          position: "relative",
          color: "primary.contrastText",
          marginTop: "92.31px",
          paddingY: "60px",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CameraIcon
              sx={{
                fontSize: "7rem",
                animation: `${rotate360} 5s linear infinite`,
              }}
            />

            <Typography
              fontSize={{ xs: "3rem", md: "4rem", lg: "6rem" }}
              sx={{
                fontWeight: "700",
                ...uiConfigs.style.typoLines(2, "center"),
              }}
            >
              PHOBYPHO
            </Typography>
          </Typography>
        </Box>
        <Stack
          rowGap={3}
          marginY={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant="h4"
            fontSize={{ xs: "2rem", md: "2rem", lg: "3rem" }}
            fontWeight="600"
            sx={{
              ...uiConfigs.style.typoLines(2, "center"),
            }}
          >
            Preserving Timeless Treasures: Unveiling the Chronicles of Memory
          </Typography>

          <Typography
            width={"50%"}
            variant="h4"
            fontSize={{ xs: "1rem", md: "1rem", lg: "1.3rem" }}
            fontWeight="300"
            sx={{
              ...uiConfigs.style.typoLines(2, "center"),
              textAlign: "center",
            }}
          >
            " Embark on a Enchanting Journey Through the Chronicles of Memory,
            Rediscover Timeless Treasures, Unveil Moments of Eternal Beauty"
          </Typography>
        </Stack>
      </Box>
    </Fragment>
  );
}

export default AboutUs;
