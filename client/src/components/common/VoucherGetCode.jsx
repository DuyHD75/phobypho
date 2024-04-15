import React, { useState, useEffect } from "react";
import { Box, Stack, IconButton, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const NotificationBox = ({ type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      backgroundColor={"rgba(19, 19, 19, 0.8)"}
      position={"absolute "}
      width={"100%"}
      height={"100%"}
      top={0}
      left={0}
    >
      <Stack
        width={"100%"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack>
          <IconButton
            sx={{
              "::before": {
                content: '""',
                position: "absolute",
                width: "138px",
                height: "138px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                border:
                  type === "success"
                    ? "2px solid #65ff26"
                    : "2px solid #ff0000",
              },
            }}
          >
            {type === "success" ? (
              <DoneIcon
                sx={{
                  padding: "10px",
                  fontSize: "7rem",
                  color: "#65ff26",
                }}
              />
            ) : (
              <CloseIcon
                sx={{
                  padding: "10px",
                  fontSize: "7rem",
                  color: "#ff0000",
                }}
              />
            )}
          </IconButton>
        </Stack>

        <Stack>
          <Typography
            variant="h4"
            fontSize={"1.4rem"}
            fontWeight="800"
            marginY={{ xs: "20px", md: "36px" }}
            height={"36px"}
            color={type === "success" ? "#65ff26" : "#ff0000"}
            textTransform="uppercase"
          >
            {type === "success" ? "đổi quà thành công" : "bạn không đủ điểm"}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NotificationBox;
