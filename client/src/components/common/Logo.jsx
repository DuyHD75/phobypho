import React from "react";
import { Typography } from "@mui/material";
import CameraIcon from "@mui/icons-material/Camera";

const Logo = ({ isHeader }) => {
  return isHeader ? (
    <Typography
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <CameraIcon sx={{ fontSize: "2.4rem" }} />

      <span
        style={{
          color: "0d1b2a",
          fontSize: "1.3rem",
          lineHeight: "2rem",
          fontWeight: 700,
        }}
      >
        PHOBYPHO
      </span>
    </Typography>
  ) : (
    <Typography
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <CameraIcon sx={{ fontSize: { xs: "1rem", md: "3rem" } }} />

      <span
        style={{
          color: "0d1b2a",
          fontSize: "1.2rem",
          lineHeight: "1rem",
        }}
      >
        PHOBYPHO
      </span>
    </Typography>
  );
};

export default Logo;
