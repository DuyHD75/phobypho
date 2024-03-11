import React, { Fragment, useState } from 'react'
import { Typography, Box, Stack, Modal, Button } from '@mui/material';
import uiConfigs from '../../configs/ui.config';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { LoadingButton } from "@mui/lab";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

const style = {
     position: 'absolute',
     top: '45%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: '100%',
     border: '2px solid #000',
     boxShadow: 24,
     maxWidth: '500px',
     bgcolor: 'background.paper',
     borderRadius: '10px', 
     overflow: 'hidden'

};

const ConfirmModal = ({ setOpenModal, openModal }) => {

     const dispatch = useDispatch();
     const [isLoginRequest, setIsLoginRequest] = useState(false);
     const [errorMessage, setErrorMessage] = useState();
     const [onRequest, setOnRequest] = useState(false);

     const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
     const [selectedLocation, setSelectedLocation] = useState('');

     const handleLocationChange = (event, value) => {
          setSelectedLocation(value);
     };

     const confirmInfo = useFormik({
          initialValues: {
               location: '',
               photoSession: ''
          },
          validationSchema: Yup.object({
               location: Yup.string()
                    .required("location is required !"),
               photoSession: Yup.string()
                    .required("Password is required !")
          }),
          onSubmit: async values => {
               // setErrorMessage(undefined);
               // setIsLoginRequest(true);
               // const { response, err } = await userApi.login(values);
               // setIsLoginRequest(false);

               // if (response) {
               //      loginForm.resetForm();
               //      dispatch(setUser(response));
               //      dispatch(setAuthModalOpen(false));
               //      toast.success("Login Successfully !");
               // }
               // if (err) setErrorMessage(err.message);
          }
     });



     return (
          <Modal
               open={openModal}
               onClose={() => setOpenModal(false)}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
          >
               <Box sx={style}>

                    <Typography
                         sx={{
                              ...uiConfigs.style.typoLines(1, 'center'),
                              bgcolor: '#C48F56',
                              width: '100%',
                              padding: '10px',
                              fontWeight: 600
                         }}
                    >REQUEST AN APPOINTMENT</Typography>

                    <Typography
                         sx={{
                              ...uiConfigs.style.typoLines(1, 'left'),
                              width: '100%',
                              padding: '0.5rem 1rem',
                         }}
                    >
                         Please confirm that you would like to request the following appointment:
                    </Typography>


                    <Box
                         sx={{
                              display: 'flex', flexDirection: 'column',
                              justifyContent: 'center', padding: '0 1rem'
                         }}
                    >
                         <Typography sx={{
                              ...uiConfigs.style.typoLines(1, 'left'), width: '100%', padding: '10px'
                         }}>Photosession</Typography>

                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                   value={value}
                                   onChange={(newValue) => setValue(newValue)}
                                   sx={{ width: '100%', fontSize: '1rem', fontFamily: "Saira Condensed", }}
                              />
                         </LocalizationProvider>
                    </Box>

                    <Box
                         sx={{
                              display: 'flex', flexDirection: 'column',
                              justifyContent: 'center', padding: '0 1rem'

                         }}
                    >
                         <Typography sx={{
                              ...uiConfigs.style.typoLines(1, 'left'), width: '100%', padding: '10px'
                         }}>Your Location:</Typography>

                         <TextField
                              type='text' placeholder='Enter you location ...' name='location'
                              fullWidth value={confirmInfo.values.location} onChange={confirmInfo.handleChange}
                              color='warning'
                              error={confirmInfo.touched.location && confirmInfo.errors.location}
                              helperText={confirmInfo.touched.location && confirmInfo.errors.location}
                         />
                    </Box>


                    <Box
                         sx={{
                              display: 'flex', flexDirection: 'row',
                              justifyContent: 'center', padding: '0 1rem',
                              marginBottom: '1rem'
                         }}
                    >
                         <LoadingButton
                              variant="text"
                              size="medium"
                              sx={{
                                   width: "max-content",
                                   border: '1px solid #C48F56',
                                   color: '#fff',
                                   marginTop: '2rem',
                                   padding: '2px 1rem',
                                   ...uiConfigs.style.typoLines(1, 'left'),
                                   display: 'flex',
                                   alignItems: "center",
                                   fontSize: '1rem',
                                   textTransform: 'capitalize'

                              }}
                              loadingPosition="start"
                              loading={onRequest}

                         >
                              Request appointment
                         </LoadingButton>


                    </Box>

               </Box>
          </Modal>
     )
}

export default ConfirmModal
