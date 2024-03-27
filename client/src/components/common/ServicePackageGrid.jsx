import { Card, CardMedia, Typography, Box, Stack, Modal, Button, Grid } from '@mui/material'
import React, { Fragment } from 'react'
import uiConfigs from '../../configs/ui.config'
import ServicePackageItem from './ServicePackageItem';

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
const ServicePackageGrid = ({ servicePackages, setOpenModal }) => {
     console.log(servicePackages)

     return (
          <Fragment>

               {servicePackages.length > 0 ? (
                    <Grid container spacing={2}>
                         <Grid item xs={12} md={6} key={'1'}>
                         </Grid>
                    </Grid>
               ) : (
                    <Button
                         sx={{
                              position: 'relative',
                              width: '100%',
                              borderRadius: '10px',
                              border: '1px solid #333',
                              height: '150px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff'
                         }}
                         onClick={() => setOpenModal(true)}
                    >
                         <AddToPhotosIcon sx={{ fontSize: '4.6rem', opacity: '0.5' }} />
                         <Typography variant='p' sx={{
                              ...uiConfigs.style.typoLines(1, 'center'),
                         }}>
                              You have not created the service pack yet, please create it now!
                         </Typography>

                    </Button>)}

          </Fragment>
     )
}

export default ServicePackageGrid

// <ServicePackageItem service={''} />

//{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
