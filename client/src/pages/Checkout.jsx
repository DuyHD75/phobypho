import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { routesGen } from '../routers/routes';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import uiConfigs from '../configs/ui.config';

import customerApi from '../api/modules/customer.api';
import { toast } from 'react-toastify';

const Checkout = () => {

     const locationHook = useLocation();
     const [bookingData, setBookingData] = useState(locationHook.state);
     const [errorMessage, setErrorMessage] = useState(null);
     const [vouchers, setVouchers] = useState([]);
     const [transactionCode, setTransactionCode] = useState("");
     const [isProcessing, setIsProcessing] = useState(false);
     const [voucherCode, setVoucherCode] = useState('');

     const currentPrice = bookingData.service_package.price;

     const generateTransactionCode = () => {
          const length = 7;
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          let code = '';

          for (let i = 0; i < length; i++) {
               const randomIndex = Math.floor(Math.random() * characters.length);
               code += characters.charAt(randomIndex);
          }
          setTransactionCode(code);
     };

     useEffect(() => {
          generateTransactionCode();
          const getCustomerVouchers = async () => {
               const { response, err } = await customerApi.getCustomerVouchers();

               if (response) {
                    setVouchers(response.vouchers);
               }
               if (err) {
                    return toast.error('Lỗi khi lấy thông tin voucher !');
               }
          }
          getCustomerVouchers();
     }, [])

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
          const updatedBookingData = { ...bookingData, voucher_code: voucherCode, total_price: totalPrice, };

          setBookingData(updatedBookingData);

          setIsProcessing(true);
          const { response, err } = await customerApi.createBooking(updatedBookingData);
          setIsProcessing(false);
          if (response) {
               return toast.success('Thanh toán thành công !');
          }
          if (err) {
               return toast.error(err.message);
          }
     };

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
                              <Box
                                   sx={{
                                        position: 'relative',
                                        width: { xs: '100%', md: '50%' },
                                        height: 'max-content'
                                   }}

                              >

                                   <Stack
                                        direction={'column'}
                                        alignItems={"center"}

                                        sx={{
                                             zIndex: 99,
                                        }}
                                   >
                                        <Box
                                             sx={{
                                                  borderRadius: '10rem 20rem',
                                                  overflow: 'hidden',
                                                  boxShadow: '1px 10px 10px rgba(255, 255, 255, 0.5)',
                                                  width: { xs: '20rem', md: '30rem' },

                                             }}
                                        >
                                             <img
                                                  src='https://cdn.tgdd.vn/hoi-dap/1309185/ma-qr-code-la-gi-dung-de-lam-gi-cach-tao-ma-qr-nhanh-chong%20(1).jpg'
                                                  alt='QR code'
                                             />
                                        </Box>

                                        <Typography
                                             sx={{
                                                  marginTop: '2rem',
                                                  fontSize: '1.2rem',
                                                  fontWeight: 500,
                                                  color: 'red',
                                                  ...uiConfigs.style.typoLines(2, 'center'),
                                             }}

                                        > ! Vui lòng nhập mã code bên dưới vào mục nội dung thanh toán !</Typography>
                                        <Typography
                                             sx={{
                                                  marginTop: '2rem',
                                                  fontSize: '1.4rem',
                                                  width: 'fit-content',
                                                  padding: '0.4rem 4rem',
                                                  fontWeight: 700,
                                                  ...uiConfigs.style.typoLines(1, 'center'),
                                                  border: '1px groove #2D89E5',
                                                  letterSpacing: '2px',
                                                  color: 'secondary.colorText',

                                             }}

                                        >{transactionCode}</Typography>
                                   </Stack>


                              </Box>

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
                                                  {bookingData.photo.account.username}
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
                                             {bookingData.photo_session}
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
                                        {isProcessing ? 'Đang xử lý...' : 'Hoàn tất thanh toán'}
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
