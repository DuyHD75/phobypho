import React, { Fragment, useState } from 'react'
import { Card, CardMedia, Typography, Box, Stack, Modal, Button } from '@mui/material';
import uiConfigs from '../../configs/ui.config';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LoadingButton } from "@mui/lab";
import ConfirmModal from './ConfirmModal';




const ServicePackage = ({ services }) => {
     const [openModal, setOpenModal] = useState(false);



     return (


          <Fragment>

               <ConfirmModal setOpenModal={setOpenModal} openModal={openModal} />
               <Stack spacing={3} direction={'column'} padding={'1rem 0.5rem'}>
                    <Card
                         sx={{
                              display: 'flex', width: '100%', padding: 0, zIndex: 99,
                              transition: 'all .3s ease',
                              '&:hover': { cursor: 'pointer', transform: 'translateY(-5px)' }
                         }}
                         onClick={() => setOpenModal(true)}
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
                              <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(1, 'left'), fontSize: '1.2rem' }}>
                                   VIP <span style={{ fontFamily: "Saira Condensed", fontSize: '1.6rem', color: '#C48F56' }}>69.000</span>
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" sx={{
                                   ...uiConfigs.style.typoLines(2, 'left'),
                              }}>
                                   30 minus work, maximum 50 photos width high resolution
                              </Typography>
                         </Box>

                    </Card>

               </Stack>

          </Fragment>
     );
};

export default ServicePackage;
