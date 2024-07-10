import React, { Fragment, useState } from 'react'
import uiConfigs from '../configs/ui.config'
import { Box, Stack, Alert, TextField, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch } from 'react-redux'
import { TbCubeSend } from "react-icons/tb";
import * as Yup from 'yup';

const ResetPassword = () => {

   const [isResetRequest, setIsResetRequest] = useState(false)

   const [errorMessage, setErrorMessage] = useState();
   const dispatch = useDispatch();

   const resetPasswordForm = useFormik({

      initialValues: {
         password: '',
         confirmPassword: ''
      },
      validationSchema: Yup.object({
         password: Yup.string()
            .min(8, "Mật khẩu ít nhất 8 ký tự !")
            .required("Mật khẩu cần phải nhập !"),
         confirmPassword: Yup.string()
            .min(8, "Xác nhận mật khẩu ít nhất 8 ký tự !")
            .required("Xác nhận mật khẩu cần phải nhập"),
      }),
      onSubmit: async values => {

         console.log(values);
         setErrorMessage(undefined);
         setIsResetRequest(true);
         // const { response, err } = await userApi.forgotPassword(values);
         setIsResetRequest(false);

         // if (response) {
         //    resetPasswordForm.resetForm();
         //    dispatch(setUser(response));
         //    dispatch(setAuthModalOpen(false));
         //    toast.success("Đăng nhập thành công !");
         // }
         // if (err) setErrorMessage(err.message);
      }
   })

   return (
      <Fragment>
         <Box
            sx={{
               ...uiConfigs.style.mainContent,
               padding: { xs: '16px', md: '0 4rem' },
               marginTop: '4rem',
               width: '100%',
            }}
         >
            <Box sx={{
               marginTop: {
                  xs: "5rem", md: "8rem", lg: "8rem",
               },
               maxWidth: '500px',
               position: 'relative',
               left: '50%',
               transform: 'translateX(-50%)',
               ...uiConfigs.style.typoLines(1, "left")
            }}>

               <Box component='form' onSubmit={resetPasswordForm.handleSubmit} sx={{ marginTop: '2rem' }} >

                  <Typography
                     sx={{
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        textAlign: 'center',
                        marginBottom: '10px',
                        marginTop: '1rem',
                        ...uiConfigs.style.typoLines(1, "left")
                     }}
                  >
                     Đặt lại mật khẩu
                     <Typography
                        sx={{
                           fontSize: '0.9rem',
                           fontWeight: 400,
                           textAlign: 'center',
                           marginBottom: '10px',
                           ...uiConfigs.style.typoLines(1, "left")
                        }}
                     >Nhập các thông tin bên dưới để đặt lại mật khẩu!</Typography>
                  </Typography>


                  <Stack spacing={2}>
                     <TextField
                        type='password' placeholder='Nhập mật khẩu của bạn ...' name='password'
                        fullWidth value={resetPasswordForm.values.password}
                        onChange={resetPasswordForm.handleChange}
                        color='warning'
                        error={resetPasswordForm.touched.password && resetPasswordForm.errors.password}
                        helperText={resetPasswordForm.touched.password && resetPasswordForm.errors.password}
                     ></TextField>

                     <TextField
                        type='password' placeholder='Nhập xác nhận mật khẩu của bạn ...' name='confirmPassword'
                        fullWidth value={resetPasswordForm.values.confirmPassword}
                        onChange={resetPasswordForm.handleChange}
                        color='warning'
                        error={resetPasswordForm.touched.confirmPassword && resetPasswordForm.errors.confirmPassword}
                        helperText={resetPasswordForm.touched.confirmPassword && resetPasswordForm.errors.confirmPassword}
                     ></TextField>

                     <LoadingButton
                        loadingPosition='start'
                        type='submit'
                        fullWidth
                        size='small'
                        sx={{
                           marginTop: 4,
                           fontFamily: '"Nunito", sans-serif',
                           fontSize: '0.9rem',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           flexDirection: 'row',
                           textTransform: 'none',
                        }}
                        loading={isResetRequest}
                        startIcon={<TbCubeSend style={{ fontSize: '2rem' }} />}
                     >
                        Đặt lại mật khẩu
                     </LoadingButton>
                  </Stack>

                  {errorMessage && (
                     <Box sx={{ marginTop: 2 }}>
                        <Alert severity='error' variant='outlined'>{errorMessage}</Alert>
                     </Box>
                  )}
               </Box>

            </Box>
         </Box>
      </Fragment>
   )
}

export default ResetPassword
