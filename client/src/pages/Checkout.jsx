import React, { Fragment, useEffect, useState } from 'react'
import { Box, Stack, TextField, Typography } from '@mui/material';

import Container from '../components/common/Container';
import uiConfigs from '../configs/ui.config';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../components/common/Logo';
import CameraIcon from '@mui/icons-material/Camera';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { routesGen } from '../routers/routes';
import { LoadingButton } from '@mui/lab';


const Checkout = () => {

     const locationHook = useLocation();
     console.log(locationHook.state)

     const { photo_id, service_package, location, photo_session } = locationHook.state;

     const [errormessage, setErrormessage] = useState(null)

     const [discount, setDiscount] = useState(null);


     const checkVoucherCode = (event) => {
          if (event.target.value === "PHPDIS20") {
               setDiscount(20);
               setErrormessage('');
          }
          else setErrormessage("Code is not valid");
     }




     return (
          <Fragment>
               <Box
                    sx={{
                         color: 'primary.contrastText',
                         ...uiConfigs.style.mainContent,
                         padding: { xs: '16px', md: '0 4rem' },
                         marginBottom: '4rem'
                    }}
               >


                    <Box sx={{ marginTop: { xs: "5rem", md: "8rem", lg: "8rem" } }}>
                         <Typography
                              sx={{
                                   ...uiConfigs.style.typoLines(1, 'left'),
                                   fontSize: { xs: '2rem', md: '3rem', lg: '3.6rem' },
                                   fontWeight: 800,
                                   position: 'relative',
                                   "::before": {
                                        position: 'absolute',
                                        content: '""',
                                        width: '2rem',
                                        height: '2px',
                                        bgcolor: '#C48F56',
                                        bottom: 0,
                                        left: 0
                                   }
                              }}
                         >
                              Check out
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
                                                  fontSize: '2rem',
                                                  width: '70%',
                                                  fontWeight: 700,
                                                  ...uiConfigs.style.typoLines(1, 'center'),
                                                  border: '1px groove #C48F56',
                                                  letterSpacing: '2px'
                                             }}

                                        >HKDKJSIE</Typography>
                                   </Stack>


                              </Box>

                              {/* Bill*/}
                              <Stack
                                   sx={{
                                        width: { xs: '100%', md: '45%' },
                                        padding: '0 1rem',
                                        zIndex: 99
                                   }}
                                   direction={'column'}
                              >
                                   <Typography
                                        sx={{
                                             fontSize: { xs: '1.6rem', md: '2rem' },
                                             fontWeight: '700',
                                             ...uiConfigs.style.typoLines(1, 'center'),
                                             padding: '1rem',
                                             bgcolor: '#333',
                                             borderBottom: '2px solid #fff',
                                        }}

                                   >Your booking</Typography>

                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#333',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1.1rem',

                                        }}>Thợ chụp ảnh: </Typography>
                                        <Box>
                                             <Link
                                                  to={routesGen.photoDetail("1")}
                                                  style={{
                                                       textDecoration: 'none',
                                                       fontSize: '1.1rem',
                                                       color: '#C48F56',
                                                       ...uiConfigs.style.typoLines(1, 'left')
                                                  }}
                                             >
                                                  {photo_id}
                                             </Link>

                                        </Box>


                                   </Stack>



                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#333',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1.1rem',

                                        }}>Địa điểm: </Typography>
                                        <Typography
                                             style={{
                                                  textDecoration: 'none',
                                                  fontSize: '1.1rem',
                                                  color: '#C48F56',
                                                  width: '60%',
                                                  ...uiConfigs.style.typoLines(3, 'right')
                                             }}
                                        >
                                             {location}
                                        </Typography>


                                   </Stack>


                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#333',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1.1rem',

                                        }}>Ngày đặt lịch: </Typography>
                                        <Typography
                                             style={{
                                                  textDecoration: 'none',
                                                  fontSize: '1.1rem',
                                                  color: '#C48F56',
                                                  width: '60%',
                                                  ...uiConfigs.style.typoLines(3, 'right')
                                             }}
                                        >
                                             {photo_session}
                                        </Typography>


                                   </Stack>

                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#333',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1.1rem',

                                        }}>Gói dịch vụ: </Typography>
                                        <Box>
                                             <Link
                                                  to={routesGen.photoDetail("1")}
                                                  style={{
                                                       textDecoration: 'none',
                                                       fontSize: '1.1rem',
                                                       color: '#C48F56',
                                                       ...uiConfigs.style.typoLines(2, 'right')
                                                  }}
                                             >
                                                  {service_package.name}
                                             </Link>

                                        </Box>


                                   </Stack>

                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#333',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1.1rem',

                                        }}>Giá: </Typography>
                                        <Box>
                                             <Link
                                                  to={routesGen.photoDetail("1")}
                                                  style={{
                                                       textDecoration: 'none',
                                                       fontSize: '1.1rem',
                                                       color: '#C48F56',
                                                       ...uiConfigs.style.typoLines(2, 'right')
                                                  }}
                                             >
                                                  {service_package.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                             </Link>

                                        </Box>


                                   </Stack>


                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#333',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1.1rem',
                                        }}>Mã giảm giá: </Typography>
                                        <Box>
                                             <TextField
                                                  onChange={checkVoucherCode}
                                                  type='text' placeholder='Enter voucher code' name='voucher_code'
                                                  fullWidth
                                                  color='warning'
                                                  error={errormessage}
                                                  helperText={errormessage}
                                             />

                                        </Box>


                                   </Stack>
                                   <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                                        sx={{
                                             bgcolor: '#333',
                                             borderBottom: '1px solid #000',
                                             padding: '1rem'
                                        }}
                                   >
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: '1.1rem',

                                        }}>Tổng hóa đơn: </Typography>
                                        <Box>
                                             <Link
                                                  to={routesGen.photoDetail("1")}
                                                  style={{
                                                       textDecoration: 'none',
                                                       fontSize: '1.1rem',
                                                       color: '#C48F56',
                                                       ...uiConfigs.style.typoLines(1, 'left')
                                                  }}
                                             >
                                                  {
                                                       discount ?
                                                            (service_package.price - (service_package.price * 0.2)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) :

                                                            (service_package.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))

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
                                   >
                                        Hoàn tất thanh toán
                                   </LoadingButton>

                                   <Typography
                                        sx={{
                                             color: '#C48F56',
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
