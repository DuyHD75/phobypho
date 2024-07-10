import React, { useState } from 'react'
import { Box, Stack, Alert, TextField, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch } from 'react-redux'
import uiConfigs from '../../configs/ui.config';
import { TbCubeSend } from "react-icons/tb";
import * as Yup from 'yup';


const ForgotPasswordModal = ({ switchAuthState }) => {

   const [isResetRequest, setIsResetRequest] = useState(false)

   const [errorMessage, setErrorMessage] = useState();
   const dispatch = useDispatch();

   const forgotPasswordForm = useFormik({
      initialValues: {
         email: ''
      },
      validationSchema: Yup.object({
         email: Yup.string()
            .min(8, "Email không hợp lệ !")
            .required("Email phải được nhập !"),
      }),
      onSubmit: async values => {

         console.log(values);
         setErrorMessage(undefined);
         setIsResetRequest(true);
         // const { response, err } = await userApi.forgotPassword(values);
         setIsResetRequest(false);

         // if (response) {
         //    forgotPasswordForm.resetForm();
         //    dispatch(setUser(response));
         //    dispatch(setAuthModalOpen(false));
         //    toast.success("Đăng nhập thành công !");
         // }
         // if (err) setErrorMessage(err.message);
      }
   })



   return (
      <Box component='form' onSubmit={forgotPasswordForm.handleSubmit} >

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
            >Nhập email bạn đã đăng ký để đặt lại mật khẩu!</Typography>
         </Typography>


         <Stack spacing={2}>
            <TextField
               type='email' placeholder='Nhập email của bạn ...' name='email'
               fullWidth value={forgotPasswordForm.values.email}
               onChange={forgotPasswordForm.handleChange}
               color='warning'
               error={forgotPasswordForm.touched.email && forgotPasswordForm.errors.email}
               helperText={forgotPasswordForm.touched.email && forgotPasswordForm.errors.email}
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
               Gửi yêu cầu
            </LoadingButton>
         </Stack>

         <Stack justifyContent={"center"} alignItems={"center"} direction={"row"}>
            <Typography sx={{
               fontSize: '0.9rem',
               ...uiConfigs.style.typoLines(1, "left"),
            }}>
               Quay trở lại đăng nhập?
            </Typography>
            <Button
               sx={{ fontFamily: '"Nunito", sans-serif', fontSize: '0.9rem', textTransform: 'none' }}
               onClick={() => switchAuthState("login")}
            >
               Đăng nhập
            </Button>

         </Stack>



         {errorMessage && (
            <Box sx={{ marginTop: 2 }}>
               <Alert severity='error' variant='outlined'>{errorMessage}</Alert>
            </Box>
         )}
      </Box>
   )
}

export default ForgotPasswordModal
