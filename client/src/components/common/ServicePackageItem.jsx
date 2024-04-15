import React, { Fragment, useCallback, useState } from "react";
import {
  Card,
  CardMedia,
  Typography,
  Box
} from "@mui/material";
import uiConfigs from "../../configs/ui.config";

const ServicePackageItem = ({
  service,
  index,
  handleCardAction,
  addedServices,
}) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleCardClick = useCallback(() => {
    if (handleCardAction) {
      handleCardAction((prev) => {
        if (prev.includes(service._id)) {
          return prev.filter((id) => id !== service._id);
        } else {
          return [...prev, service._id];
        }
      });
    }
  }, []);

  const hasAddedService = addedServices && addedServices.includes(service._id);

  return (
    <Fragment>
      {addedServices ? (
        <Card
          key={index}
          sx={{
            display: "flex",
            width: "100%",
            padding: 0,
            zIndex: 99,
            transition: "all .3s ease",
            border: "2px solid #C48F56",
            position: "relative",
            "&:hover": {
              cursor: "pointer",
              transform: "translateY(-5px)",
              boxShadow: "rgba(255, 255, 255, 0.35) 0px 5px 15px",
              borderRadius: "5px",
            }
          }}
          onClick={handleCardClick}
        >
          <Box
            className='voucher_selected'
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              display: hasAddedService ? "flex" : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-45deg)',
              color: "secondary.colorText",
              fontSize: '1.2rem',
              fontWeight: '600',
            }}
          >
            Đã chọn
          </Box>

          <CardMedia
            component="img"
            sx={{ width: "32%", height: "max-content" }}
            image="https://mui.com/static/images/cards/live-from-space.jpg"
            alt="Live from space album cover"
          />
          <Box
            className="card_content"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "3px",
              marginLeft: "8px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                ...uiConfigs.style.typoLines(1, "left"),
                fontSize: "1.3rem",
              }}
            >
              {service.name.split(" ")[0]}

              <span
                style={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: "1.6rem",
                  color: "secondary.colorText",
                  paddingLeft: "12px",
                }}
              >
                {service.name.split(" ").slice(1).join(" ")}
              </span>
            </Typography>
            <Typography
              variant="subtitle1"
              color="secondary.colorText"
              sx={{
                ...uiConfigs.style.typoLines(4, "left"),
              }}
            >
              {service.description}
            </Typography>
          </Box>
        </Card>
      ) : (
        <Card
          key={index}
          sx={{
            display: "flex",
            width: "100%",
            padding: 0,
            zIndex: 99,
            transition: "all .3s ease",
            border: "2px solid #C48F56",
            "&:hover": {
              cursor: "pointer",
              transform: "translateY(-5px)",
              boxShadow: "rgba(255, 255, 255, 0.35) 0px 5px 15px",
              borderRadius: "5px",
            },
          }}
          onClick={handleCardClick}
        >
          <CardMedia
            component="img"
            sx={{ width: "32%", height: "max-content" }}
            image="https://mui.com/static/images/cards/live-from-space.jpg"
            alt="Live from space album cover"
          />
          <Box
            className="card_content"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "3px",
              marginLeft: "8px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                ...uiConfigs.style.typoLines(1, "left"),
                fontSize: "1.3rem",
              }}
            >
              {service.name.split(" ")[0]}

              <span
                style={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: "1.6rem",
                  color: "secondary.colorText",
                  paddingLeft: "12px",
                }}
              >
                {service.name.split(" ").slice(1).join(" ")}
              </span>
            </Typography>
            <Typography
              variant="subtitle1"
              color="secondary.colorText"
              sx={{
                ...uiConfigs.style.typoLines(4, "left"),
              }}
            >
              {service.description}
            </Typography>
          </Box>
        </Card>
      )
      }
    </Fragment >
  );
};

export default ServicePackageItem;
