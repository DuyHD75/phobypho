import React, { Fragment } from 'react'
import { Card, CardMedia, Typography, Box, Stack, Modal, Button, } from '@mui/material';
import uiConfigs from '../../configs/ui.config';


const ServicePackageItem = ({ service, index, handleModalAction }) => {
     return (
          <Fragment>
               <Card
                    key={index}
                    sx={{
                         display: 'flex', width: '100%',
                         padding: 0, zIndex: 99,
                         transition: 'all .3s ease',
                         border: '2px solid #C48F56',
                         '&:hover': {
                              cursor: 'pointer', transform: 'translateY(-5px)',
                              boxShadow: 'rgba(255, 255, 255, 0.35) 0px 5px 15px',
                              borderRadius: '5px'
                         }
                    }}
                    onClick={() => handleModalAction(service._id)}
               >

                    <CardMedia
                         component="img"
                         sx={{ width: 100, height: 'max-content' }}
                         image="https://mui.com/static/images/cards/live-from-space.jpg"
                         alt="Live from space album cover"
                    />
                    <Box
                         className="card_content"
                         sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              padding: '3px', marginLeft: '8px',
                         }}>
                         <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(1, 'left'), fontSize: '1rem' }}>
                              {service.name}
                              <span style={{ fontFamily: "Saira Condensed", fontSize: '1.6rem', color: '#C48F56', paddingLeft: '6px' }}>
                                   {service.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                              </span>
                         </Typography>
                         <Typography variant="subtitle1" color="text.secondary" sx={{
                              ...uiConfigs.style.typoLines(2, 'left'),
                         }}>
                              {service.description}
                         </Typography>
                    </Box>
               </Card>
          </Fragment>
     )
}

export default ServicePackageItem;

