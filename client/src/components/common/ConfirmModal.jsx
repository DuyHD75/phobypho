import React, { Fragment, useCallback, useState } from 'react'
import { Typography, Box, Stack, Modal, Alert } from '@mui/material';
import uiConfigs from '../../configs/ui.config';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { LoadingButton } from "@mui/lab";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { routesGen } from '../../routers/routes';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import moment from 'moment';


const style = {
     position: 'absolute',
     top: '45%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: '100%',
     boxShadow: 24,
     maxWidth: '500px',
     bgcolor: '#fff',
     borderRadius: '5px',
     overflow: 'hidden'
};

const ConfirmModal = ({ setOpenModal, openModal, bookingData }) => {

     const dispatch = useDispatch();
     const navigate = useNavigate();
     const { user } = useSelector((state) => state.user);
     const [isLoginRequest, setIsLoginRequest] = useState(false);
     const [errorMessage, setErrorMessage] = useState();
     const [onRequest, setOnRequest] = useState(false);

     const [bookingTime, setBookingTime] = useState(dayjs());

     const validateBookingTime = (bookingTime) => {
          const currentTime = moment();
          const futureTime = moment().add(3, 'hours');
          const userChosenTime = moment(bookingTime.format('YYYY-MM-DD HH:mm'));

          return userChosenTime.isSameOrAfter(futureTime);
     };


     const confirmInfo = useFormik({
          initialValues: {
               location: ''
          },
          validationSchema: Yup.object({
               location: Yup.string()
                    .required("Location is required !"),
          }),
          onSubmit: async values => {

               if (!user) {
                    toast.error('Vui lòng đăng nhập để tiếp tục !');
                    dispatch(setAuthModalOpen(true));
                    return;
               }
               if (user.role === 'PHOTOGRAPHER') {
                    toast.error('Tài khoản của bạn không thể đặt lịch !');
                    return;
               }

               if (bookingData.photo.status === "INACTIVE") {
                    toast.error('Thợ chụp ảnh không hoạt động. Vui lòng chọn người khác!');
                    return;
               }

               if (!validateBookingTime(bookingTime)) {
                    toast.error('Thời gian đặt lịch không hợp lệ !');
                    return;
               }

               setErrorMessage(undefined);
               setIsLoginRequest(true);
               const data = {
                    ...bookingData,
                    ...values,
                    photo_session: bookingTime?.format('YYYY-MM-DD HH:mm'),
               };
               navigate("/checkout", { state: data });
          }
     });

     const handleCloseModal = useCallback(() => {
          setOpenModal(false);
     }, [setOpenModal])

     return (
          <Modal
               open={openModal}
               onClose={handleCloseModal}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
          >
               <Box sx={style}>

                    <Typography
                         sx={{
                              ...uiConfigs.style.typoLines(1, 'center'),
                              bgcolor: 'primary.main',
                              width: '100%',
                              padding: '10px',
                              fontWeight: 600
                         }}
                    >THÔNG TIN ĐẶT LỊCH</Typography>

                    <Typography
                         sx={{
                              ...uiConfigs.style.typoLines(2, 'left'),
                              width: '100%',
                              padding: '0.5rem 1rem',

                         }}
                    >
                         Vui lòng cung cấp thêm các thông tin bên dưới để hoàn tất việc đặt lịch bạn nhé !
                    </Typography>



                    <Box component={'form'} onSubmit={confirmInfo.handleSubmit}>
                         <Stack spacing={1} padding={'0 1rem'}>
                              <Box>
                                   <Typography sx={{
                                        ...uiConfigs.style.typoLines(1, 'left'), width: '100%', padding: '10px'
                                   }}>Thời gian</Typography>

                                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                             value={bookingTime}
                                             onChange={(newValue) => setBookingTime(newValue)}
                                             sx={{ width: '100%', fontSize: '1rem', fontFamily: '"Nunito", sans-serif', color: '#000' }}
                                        />
                                   </LocalizationProvider>

                              </Box>

                              <Box>
                                   <Typography sx={{
                                        ...uiConfigs.style.typoLines(1, 'left'), width: '100%', padding: '10px'
                                   }}>Địa Điểm:</Typography>

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
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textDecoration: 'none',
                                        paddingBottom: '1rem'
                                   }}
                              >
                                   <LoadingButton
                                        variant="outlined"
                                        size="small"
                                        type='submit'
                                        sx={{
                                             width: "max-content",
                                             border: '2px solid primary.main',
                                             color: 'secondary.colorText',
                                             marginTop: '2rem',
                                             padding: '2px 1rem',
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             display: 'flex',
                                             justifyContent: "center",
                                             alignItems: "center",
                                             fontSize: '0.9rem',
                                             textTransform: 'capitalize'

                                        }}
                                        loadingPosition="start"
                                        loading={onRequest}
                                   >
                                        HOÀN TẤT
                                   </LoadingButton>

                                   {errorMessage && (
                                        <Box sx={{ marginTop: 2 }}>
                                             <Alert severity='error' variant='outlined'>{errorMessage}</Alert>
                                        </Box>
                                   )}

                              </Box>



                         </Stack>
                    </Box>






               </Box>
          </Modal>
     )
}

export default ConfirmModal
