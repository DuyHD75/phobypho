import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routesGen } from '../routers/routes';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import uiConfigs from '../configs/ui.config';

import customerApi from '../api/modules/customer.api';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingData } from '../redux/features/bookingSlice';
const Checkout = () => {

     const locationHook = useLocation();
     const dispatch = useDispatch();
     if (locationHook.state)
          dispatch(setBookingData(locationHook.state));

     const bookingData = useSelector(state => state.bookingReducer.bookingData);
     const { user } = useSelector(state => state.user);
     const [errorMessage, setErrorMessage] = useState(null);
     const [vouchers, setVouchers] = useState([]);
     const [isProcessing, setIsProcessing] = useState(false);
     const [voucherCode, setVoucherCode] = useState('');
     const [isPayment, setIsPayment] = useState(false);

     const navigate = useNavigate();

     const currentPrice = bookingData.service_package.price;

     useEffect(() => {
          const getCustomerVouchers = async () => {
               const { response, err } = await customerApi.getCustomerVouchers();
               if (response) setVouchers(response.vouchers);
               if (err) return toast.error('Lỗi khi lấy thông tin voucher !');
          }

          getCustomerVouchers();

     }, []);

     const [totalPrice, setTotalPrice] = useState(currentPrice);


     let timeout = null;
     const checkVoucherCode = (event) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
               const userEntryCode = event.target.value.toUpperCase();

               const voucher = vouchers.find(voucher => voucher.code === userEntryCode);

               if (voucher) {
                    setVoucherCode(voucher.code);
                    setTotalPrice(currentPrice * (1 - voucher.value / 100));
                    setErrorMessage(undefined);
               } else {
                    setErrorMessage('Mã giảm giá không hợp lệ !');
                    setTotalPrice(currentPrice);
               }

          }, 1000);
     };


     const handleCheckoutProcess = async () => {
          // Check for pending bookings
          const { response: bookingsResponse, err: bookingsErr } = await customerApi.getBookings(user.userData.account.id);
          if (bookingsErr) {
               toast.error(bookingsErr.message);
               return;
          }

          // Check if there are any pending bookings
          const pendingBooking = bookingsResponse.find(booking => booking.status === 'PENDING');
          if (pendingBooking) {
               toast.error('Bạn có một lịch hẹn đang chờ xử lý, vui lòng chờ cho đến khi lịch hẹn được xác nhận !');
               return;
          }

          const updatedBookingData = { ...bookingData, voucher_code: voucherCode, total_price: totalPrice };

          dispatch(setBookingData(updatedBookingData));
          setIsProcessing(true);

          const { response, err } = await customerApi.createPaymentLink(updatedBookingData);
          if (response) window.open(response.url, '_self');
          if (err) toast.error(err.message);
          setIsProcessing(false);
     }

     return (
          <Fragment>
               <Box
                    sx={{
                         ...uiConfigs.style.mainContent,
                         padding: { xs: '16px', md: '0 4rem' },
                         marginBottom: '4rem',
                    }}
               >

                    <Box sx={{ marginTop: { xs: "5rem", md: "8rem", lg: "8rem" } }}>
                         <Typography
                              sx={{
                                   ...uiConfigs.style.typoLines(1, 'left'),
                                   fontSize: { xs: '1rem', md: '2rem', lg: '3rem' },
                                   fontWeight: 800,
                                   position: 'relative',
                                   color: "primary.headerColor",
                                   textShadow: '1px 1px 1px #000',
                                   "::before": {
                                        position: 'absolute',
                                        content: '""',
                                        width: '2rem',
                                        height: '2px',
                                        bgcolor: 'primary.main',
                                        bottom: 0,
                                        left: 0
                                   }
                              }}
                         >
                              Thanh Toán
                         </Typography>

                         <Stack spacing={2}
                              direction={{ xs: 'column', md: 'row', lg: 'row' }}
                              sx={{ marginTop: '2rem ' }}
                              justifyContent={"space-around"}
                         >


                              {/* Bill*/}
                              <Stack
                                   sx={{
                                        width: { xs: '100%', md: '45%' },
                                        padding: '0 1rem',
                                   }}
                                   direction={'column'}
                              >
                                   <Typography
                                        sx={{
                                             fontSize: { xs: '1.2rem', md: '1.4rem' },
                                             fontWeight: '700',
                                             ...uiConfigs.style.typoLines(1, 'center'),
                                             padding: '1rem',
                                             bgcolor: '#fff',
                                             borderBottom: '2px solid #fff',
                                             textTransform: 'uppercase'
                                        }}

                                   >Hóa đơn của bạn</Typography>

                                   <Stack direction={'row'}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#ffff',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1rem',

                                        }}>Thợ chụp ảnh: </Typography>
                                        <Box>
                                             <Link
                                                  to={routesGen.photoDetail(bookingData.photo.id)}
                                                  style={{
                                                       textDecoration: 'none',
                                                       fontSize: '1rem',
                                                       color: 'primary.main',
                                                       ...uiConfigs.style.typoLines(1, 'left'),
                                                       textTransform: 'capitalize'
                                                  }}
                                             >
                                                  {bookingData.photo.account.displayName}
                                             </Link>

                                        </Box>


                                   </Stack>



                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#fff',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1rem',

                                        }}>Địa điểm: </Typography>
                                        <Typography
                                             style={{
                                                  textDecoration: 'none',
                                                  fontSize: '1rem',
                                                  color: 'primary.main',
                                                  width: '60%',
                                                  ...uiConfigs.style.typoLines(3, 'right')
                                             }}
                                        >
                                             {bookingData.location}
                                        </Typography>


                                   </Stack>

                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#fff',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1rem',

                                        }}>Ngày đặt lịch: </Typography>
                                        <Typography
                                             style={{
                                                  textDecoration: 'none',
                                                  fontSize: '1rem',
                                                  color: 'primary.main',
                                                  width: '60%',
                                                  ...uiConfigs.style.typoLines(3, 'right')
                                             }}
                                        >
                                             {moment(new Date().getTime()).format('DD-MM-YYYY  HH:mm')}
                                        </Typography>


                                   </Stack>


                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#fff',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1rem',
                                        }}>Ngày hẹn: </Typography>
                                        <Typography
                                             style={{
                                                  textDecoration: 'none',
                                                  fontSize: '1rem',
                                                  color: 'primary.main',
                                                  width: '60%',
                                                  ...uiConfigs.style.typoLines(3, 'right')
                                             }}
                                        >
                                             {moment(bookingData.photo_session).format('DD-MM-YYYY  HH:mm')}
                                        </Typography>


                                   </Stack>

                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#fff',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1rem',

                                        }}>Gói dịch vụ: </Typography>
                                        <Box>
                                             <Link
                                                  to={routesGen.photoDetail("1")}
                                                  style={{
                                                       textDecoration: 'none',
                                                       fontSize: '1rem',
                                                       color: 'primary.main',
                                                       ...uiConfigs.style.typoLines(2, 'right')
                                                  }}
                                             >
                                                  {bookingData.service_package.name}
                                             </Link>

                                        </Box>


                                   </Stack>

                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#fff',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1rem',

                                        }}>Giá: </Typography>
                                        <Box>
                                             <Link
                                                  to={routesGen.photoDetail("1")}
                                                  style={{
                                                       textDecoration: 'none',
                                                       fontSize: '1rem',
                                                       color: 'primary.main',
                                                       ...uiConfigs.style.typoLines(2, 'right')
                                                  }}
                                             >
                                                  {bookingData.service_package.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                             </Link>

                                        </Box>


                                   </Stack>


                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#fff',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1rem',
                                        }}>Mã giảm giá: </Typography>
                                        <Box>
                                             <TextField
                                                  onChange={checkVoucherCode}
                                                  type='text' placeholder='Enter voucher code' name='voucher_code'
                                                  fullWidth
                                                  color='warning'
                                                  error={errorMessage}
                                                  helperText={errorMessage}
                                             />

                                        </Box>

                                   </Stack>
                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#fff',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1rem',

                                        }}>Tổng hóa đơn: </Typography>
                                        <Box>
                                             <Link
                                                  to={routesGen.photoDetail("1")}
                                                  style={{
                                                       textDecoration: 'none',
                                                       fontSize: '1rem',
                                                       color: 'primary.main',
                                                       ...uiConfigs.style.typoLines(1, 'left')
                                                  }}
                                             >
                                                  {
                                                       totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                                  }

                                             </Link>

                                        </Box>


                                   </Stack>

                                   <LoadingButton
                                        variant="contained"
                                        loadingPosition="start"
                                        sx={{
                                             right: { xs: 0, md: "10px" },
                                             width: "max-content",
                                             position: 'relative',
                                             left: '50%',
                                             transform: 'translate(-50%, -50%)'
                                        }}
                                        onClick={handleCheckoutProcess}
                                        loading={isProcessing}
                                   >
                                        {isProcessing ? 'Đang xử lý...' : isPayment ? 'Hoàn tất thanh toán' : 'Thanh toán'}
                                   </LoadingButton>

                                   <Typography
                                        sx={{
                                             color: 'primary.main',
                                             ...uiConfigs.style.typoLines(2, 'center')
                                        }}


                                   >
                                        Chỉ bấm hoàn tất thanh toán sau khi bạn đã chuyển khoảng gói dịch vụ để chúng tôi có thể kiểm tra hóa đơn của bạn
                                   </Typography>
                              </Stack>
                         </Stack>
                    </Box>
               </Box>
          </Fragment >
     )
}

export default Checkout
