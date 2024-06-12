import React, { Fragment, useCallback } from "react";
import {
  Card,

  Typography,
  Box
} from "@mui/material";
import uiConfigs from "../../configs/ui.config";

import GrainIcon from '@mui/icons-material/Grain';

const ServicePackageItem = ({
  service,
  index,
  handleCardAction,
  addedServices,
}) => {
  

  const handleCardClick = useCallback(() => {
    if (handleCardAction) {
      let servicePackages = [...addedServices];
      if (servicePackages.includes(service._id)) {
        servicePackages = servicePackages.filter((id) => id !== service._id);
      } else {
        servicePackages.push(service._id);
      }
      handleCardAction(servicePackages);
    }
  }, [addedServices]);

  const hasAddedService = addedServices && addedServices.includes(service._id);
  const serviceNameParts = service.name.split(" ");
  const serviceDescriptionParts = service.description.split(".");
  return (
    <Fragment>
      {addedServices ? (
        <Fragment>
          <Typography sx={{
            ...uiConfigs.style.typoLines(1, 'left'),
            fontSize: '1rem',
            color: "secondary.main",
            textShadow: '0.5px 0.5px 0.5px #000',
            marginBottom: '4px',
          }}>{service.profit}</Typography>
          <Card
            key={index}
            sx={{
              display: "flex",
              width: "100%",
              padding: 0,
              transition: "all .3s ease",
              border: "2px solid #2D89E5",
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
                bgcolor: 'rgba(0, 0, 0, 0.4)',
                display: hasAddedService ? "flex" : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-45deg)',
                color: "secondary.contrastText",
                fontSize: '1.2rem',
                fontWeight: '600',
                textShadow: '1px 1px 2px #000',
              }}
            >
              Đã chọn
            </Box>

            <Box
              style={{
                width: '30%',
                borderRadius: "5px",
                backgroundImage: `url(${service.icon})`,
                objectFit: 'center',
                backgroundSize: '65%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
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
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Typography
                  sx={{
                    ...uiConfigs.style.typoLines(1, "left"),
                    fontSize: "1rem",
                    color: 'secondary.colorText'
                  }}

                >{serviceNameParts[0]}</Typography>

                <Typography
                  sx={{
                    ...uiConfigs.style.typoLines(1, "left"),
                    fontSize: "1.2rem",
                    color: 'secondary.main',
                    paddingLeft: "4px"
                  }}

                >{serviceNameParts.slice(1).join(" ")}</Typography>

              </Box>

              {serviceDescriptionParts.map((item, index) => (
                <Typography key={index} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'secondary.colorText',
                  ...uiConfigs.style.typoLines(4, "left"),

                }}>
                  <GrainIcon fontSize="1rem" style={{ marginRight: '4px', color: "secondary.main" }} />
                  {item}
                </Typography>
              ))}
            </Box>
          </Card>

        </Fragment>
      ) : (
        <Card
          key={index}
          sx={{
            display: "flex",
            width: "100%",
            padding: 0,
            zIndex: 99,
            transition: "all .3s ease",
            border: "2px solid #2D89E5",
            position: "relative",
            "&:hover": {
              cursor: "pointer",
              transform: "translateY(-5px)",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              borderRadius: "5px",
            },
          }}
          onClick={() => handleCardAction(service._id)}
        >

          <Box
            style={{
              width: '30%',
              borderRadius: "5px",
              backgroundImage: `url(${service.icon})`,
              objectFit: 'center',
              backgroundSize: '50%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: 'row',
                fontSize: "1.3rem",
              }}
            >
              <Typography
                sx={{
                  ...uiConfigs.style.typoLines(1, "left"),
                  fontSize: "1.3rem",
                  color: 'secondary.colorText'
                }}

              >{serviceNameParts[0]}</Typography>

              <Typography
                sx={{
                  ...uiConfigs.style.typoLines(1, "left"),
                  fontSize: "1.3rem",
                  color: 'secondary.main',
                  paddingLeft: "4px"
                }}

              >{serviceNameParts.slice(1).join(" ")}</Typography>

            </Box>

            {serviceDescriptionParts.map((item, index) => (
              <Typography key={index} sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.colorText',
                ...uiConfigs.style.typoLines(4, "left"),

              }}>
                <GrainIcon fontSize="1rem" style={{ marginRight: '4px', color: "secondary.main" }} />
                {item}
              </Typography>
            ))}
          </Box>
        </Card>
      )
      }
    </Fragment >
  );
};

export default ServicePackageItem;
