import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import userApi from '../../api/modules/user.api';
import { setUser } from '../../redux/features/userSlice';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { toast } from 'react-toastify';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';


const LoginModal = ({ switchAuthState }) => {

     const dispatch = useDispatch();
     const [isLoginRequest, setIsLoginRequest] = useState(false);
     const [errorMessage, setErrorMessage] = useState();

     const loginForm = useFormik({
          initialValues: {
               username: '',
               password: ''
          },
          validationSchema: Yup.object({
               username: Yup.string()
                    .min(8, "Username must be 8 characters !")
                    .required("Username is required !"),
               password: Yup.string()
                    .min(8, "Password at least 8 characters !")
                    .required("Password is required !")
          }),
          onSubmit: async values => {
               setErrorMessage(undefined);
               setIsLoginRequest(true);
               const { response, err } = await userApi.login(values);
               setIsLoginRequest(false);

               if (response) {
                    loginForm.resetForm();
                    dispatch(setUser(response));
                    dispatch(setAuthModalOpen(false));
                    toast.success("Login Successfully !");
               }
               if (err) setErrorMessage(err.message);
          }
     });


     return (
          <Box component='form' onSubmit={loginForm.handleSubmit}>
               <Stack spacing={2}>
                    <TextField
                         type='text' placeholder='Enter you username ...' name='username'
                         fullWidth value={loginForm.values.username} onChange={loginForm.handleChange}
                         color='warning'
                         error={loginForm.touched.username && loginForm.errors.username}
                         helperText={loginForm.touched.username && loginForm.errors.username}
                    ></TextField>

                    <TextField
                         type='password' placeholder='Enter you password ...' name='password'
                         fullWidth value={loginForm.values.password} onChange={loginForm.handleChange}
                         color='warning'
                         error={loginForm.touched.password && loginForm.errors.password}
                         helperText={loginForm.touched.password && loginForm.errors.password}
                    ></TextField>
               </Stack>
               <LoadingButton
                    loadingPosition='start'
                    type='submit'
                    fullWidth
                    size='medium'
                    sx={{
                         marginTop: 4,
                         fontFamily: '"Nunito", sans-serif',
                         fontSize: '1rem'
                    }}
                    loading={isLoginRequest}
               >
                    Login
               </LoadingButton>

               <Button
                    fullWidth
                    sx={{ marginTop: 1, fontFamily: '"Nunito", sans-serif', fontSize: '1rem' }}
                    onClick={() => switchAuthState()}
               >
                    Sign up
               </Button>

               {errorMessage && (
                    <Box sx={{ marginTop: 2 }}>
                         <Alert severity='error' variant='outlined'>{errorMessage}</Alert>
                    </Box>
               )}
          </Box>
     )
}

export default LoginModal
