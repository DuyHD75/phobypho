import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import userApi from '../../api/modules/user.api';
import { setUser } from '../../redux/features/userSlice';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { toast } from 'react-toastify';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import uiConfigs from '../../configs/ui.config';
import { FcGoogle } from "react-icons/fc";
import privateClient from '../../api/client/private.client';
import { getSessionData } from '../../api/client/private.client';

const LoginModal = ({ switchAuthState }) => {
     const dispatch = useDispatch();
     const [isLoginRequest, setIsLoginRequest] = useState(false);
     const [errorMessage, setErrorMessage] = useState();

     const handleLoginWithGoogle = async () => {
          window.open(process.env.REACT_APP_GOOGLE_LOGIN, "_self");
     }
     const loginForm = useFormik({
          initialValues: {
               username: "",
               password: "",
               token: ""
          },
          validationSchema: Yup.object({
               username: Yup.string()
                    .min(8, "Username ít nhất 8 ký tự !")
                    .required("Username phải được nhập !"),
               password: Yup.string()
                    .min(8, "Password ít nhất 8 ký tự !")
                    .required("Password phải được nhập !"),
          }),
          onSubmit: async (values) => {
               setErrorMessage(undefined); 
               setIsLoginRequest(true);
               const { response, err } = await userApi.login(values);
               setIsLoginRequest(false);

               if (response) {
                    if(response.userData.account.role === "ADMIN")
                         window.open( process.env.REACT_APP_ADMIN_BASE_URL+ `?token=${response.token}` || `http://localhost:3001?token=${response.token}`, "_self")
                    loginForm.resetForm();
                    localStorage.clear('roomId');

                    dispatch(setUser(response));
                    dispatch(setAuthModalOpen(false));
                    toast.success("Đăng nhập thành công !");
               }
               if (err) setErrorMessage(err.message);
          },
     });

     return (
          <Box component='form' onSubmit={loginForm.handleSubmit} >

               <Typography
                    sx={{
                         fontSize: '1.2rem',
                         fontWeight: 800,
                         textAlign: 'center',
                         marginBottom: '10px',
                         ...uiConfigs.style.typoLines(1, "left")
                    }}
               >
                    Đăng Nhập
                    <Typography
                         sx={{
                              fontSize: '0.9rem',
                              fontWeight: 400,
                              textAlign: 'center',
                              marginBottom: '10px',
                              ...uiConfigs.style.typoLines(1, "left")
                         }}
                    >Nhập username và password để đăng nhập!</Typography>
               </Typography>


               <Button
                    fullWidth
                    sx={{
                         display: 'flex',
                         justifyContent: 'center',
                         alignItems: 'center',
                         flexDirection: 'row',
                         fontFamily: '"Nunito", sans-serif',
                         fontSize: '0.9rem',
                         textTransform: 'none',
                         marginBottom: '10px'
                    }}
                    onClick={handleLoginWithGoogle}
               >
                    <FcGoogle style={{ fontSize: '1.6rem', marginRight: '10px' }} />
                    Đăng nhập với Google
               </Button>

               <Box>
                    <Typography
                         sx={{
                              display: 'flex',
                              alignItems: 'center',
                              fontSize: '0.9rem',
                              margin: '1rem 0 0.5rem 0',
                              '::before': {
                                   content: '""',
                                   flex: 1,
                                   borderBottom: '1px solid #888',
                                   marginRight: '0.5rem'
                              },
                              '::after': {
                                   content: '""',
                                   flex: 1,
                                   borderBottom: '1px solid #888',
                                   marginLeft: '0.5rem'
                              }
                         }}
                    >
                         hoặc
                    </Typography>

               </Box>


               <Stack spacing={2}>
                    <TextField
                         type="text"
                         placeholder="Nhập username của bạn ..."
                         name="username"
                         fullWidth
                         value={loginForm.values.username}
                         onChange={loginForm.handleChange}
                         color="warning"
                         error={loginForm.touched.username && loginForm.errors.username}
                         helperText={loginForm.touched.username && loginForm.errors.username}
                    ></TextField>

                    <TextField
                         type="password"
                         placeholder="Nhập password ..."
                         name="password"
                         fullWidth
                         value={loginForm.values.password}
                         onChange={loginForm.handleChange}
                         color="warning"
                         error={loginForm.touched.password && loginForm.errors.password}
                         helperText={loginForm.touched.password && loginForm.errors.password}
                    ></TextField>

                    <Button
                         sx={{
                              width: 'max-content',
                              fontSize: '0.9rem',
                              position: 'relative',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              textTransform: 'none',
                              ...uiConfigs.style.typoLines(1, "center")
                         }}
                         onClick={() => switchAuthState("forgotPassword")}
                    >
                         Bạn quên mật khẩu ?
                    </Button>

               </Stack>
               <LoadingButton
                    loadingPosition="start"
                    type="submit"
                    fullWidth
                    size="small"
                    sx={{
                         marginTop: 2,
                         fontFamily: '"Nunito", sans-serif',
                         fontSize: '1rem',
                         textTransform: 'none',
                    }}
                    loading={isLoginRequest}
                    startIcon={<FaArrowRightFromBracket />}
               >
                    Đăng nhập
               </LoadingButton>


               <Stack justifyContent={"center"} alignItems={"center"} direction={"row"}>
                    <Typography sx={{
                         fontSize: '0.9rem',
                         ...uiConfigs.style.typoLines(1, "left"),
                    }}>
                         Bạn chưa có tài khoản?
                    </Typography>
                    <Button
                         sx={{ fontFamily: '"Nunito", sans-serif', fontSize: '0.9rem', textTransform: 'none' }}
                         onClick={() => switchAuthState("signup")}
                    >
                         Đăng ký ngay
                    </Button>

               </Stack>


               {errorMessage && (
                    <Box sx={{ marginTop: 2 }}>
                         <Alert severity="error" variant="outlined">
                              {errorMessage}
                         </Alert>
                    </Box>
               )}
          </Box>
     );
};

export default LoginModal;
