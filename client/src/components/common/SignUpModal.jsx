import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import userApi from '../../api/modules/user.api';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from '../../redux/features/userSlice';
import { toast } from 'react-toastify';
import { Box, Stack, TextField, Button, Alert, Select, MenuItem, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import uiConfigs from '../../configs/ui.config';

const SignUpModal = ({ switchAuthState }) => {

  const dispatch = useDispatch();

  const { authoModalOpen } = useSelector((state) => state.authModal);
  const [isSignUpRequest, setIsSignUpRequest] = useState(false);

  const [errorMessage, setErrorMessage] = useState();
  const [role, setRole] = useState();



  const signUpForm = useFormik({
    initialValues: {
      username: "",
      displayName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      location: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Username có ít nhất 8 ký tự !")
        .required("Username cần phải nhập !"),
      displayName: Yup.string()
        .min(8, "Tên hiển thị có ít nhất 8 ký tự !")
        .required("Tên hiển thị cần phải nhập !"),
      phoneNumber: Yup.string()
        .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ !')
        .required("Số điện thoại cần phải nhập!"),
      email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email không hợp lệ !')
        .required("Email cần phải nhập !"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 ký tự !")
        .required("Mật khẩu cần phải nhập !"),
      confirmPassword: Yup.string()
        .min(8, "Xác nhận mật khẩu ít nhất 8 ký tự !")
        .required("Xác nhận mật khẩu cần phải nhập"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsSignUpRequest(true)
      const { response, err } = await userApi.signup(values);
      setIsSignUpRequest(false)

      if (response) {
        signUpForm.resetForm();
        dispatch(setAuthModalOpen(false));
        dispatch(setUser(response));
        toast.success("Sign up successfully !");
      }
      if (err) {
        setErrorMessage(err.message);
      }
    }
  })


  return (
    <Box
      component={'form'} onSubmit={signUpForm.handleSubmit}
    >

      <Typography
        sx={{
          fontSize: '1.2rem',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '10px',
          ...uiConfigs.style.typoLines(1, "left")
        }}
      >
        Đăng ký
        <Typography
          sx={{
            fontSize: '0.9rem',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: '10px',
            ...uiConfigs.style.typoLines(1, "left")
          }}
        >Nhập các thông tin bên dưới để đăng ký!</Typography>
      </Typography>


      <Stack spacing={2}>
        <TextField type='text' placeholder='Nhập username' name='username'
          fullWidth value={signUpForm.values.username} onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.username && signUpForm.errors.username !== undefined}
          helperText={signUpForm.touched.username && signUpForm.errors.username}
        >
        </TextField>
        <TextField type='text' placeholder='Nhập tên đại diện' name='displayName'
          fullWidth value={signUpForm.values.displayName} onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.displayName && signUpForm.errors.displayName !== undefined}
          helperText={signUpForm.touched.displayName && signUpForm.errors.displayName}
        >
        </TextField>
        <TextField type='text' placeholder='Nhập số điện thoại' name='phoneNumber'
          fullWidth value={signUpForm.values.phoneNumber} onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.phoneNumber && signUpForm.errors.phoneNumber !== undefined}
          helperText={signUpForm.touched.phoneNumber && signUpForm.errors.phoneNumber}
        >
        </TextField>
        <TextField type='email' placeholder='Nhập email' name='email'
          fullWidth value={signUpForm.values.email} onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.email && signUpForm.errors.email !== undefined}
          helperText={signUpForm.touched.email && signUpForm.errors.email}
        >
        </TextField>
        <TextField type='password' placeholder='Nhập mật khẩu' name='password'
          fullWidth value={signUpForm.values.password}
          onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.password && signUpForm.errors.password !== undefined}
          helperText={signUpForm.touched.password && signUpForm.errors.password}
        >
        </TextField>
        <TextField type='password' placeholder='Nhập xác nhận mật khẩu' name='confirmPassword'
          fullWidth value={signUpForm.values.confirmPassword} onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.confirmPassword && signUpForm.errors.confirmPassword !== undefined}
          helperText={signUpForm.touched.confirmPassword && signUpForm.errors.confirmPassword}
        >
        </TextField>

        <Select
          labelId="role_selection"
          id="role"
          value={signUpForm.values.role}
          onChange={signUpForm.handleChange}
          placeholder='Select you role'
          name="role"
          sx={{
            padding: '0',
          }}
        >
          <MenuItem value={"PHOTOGRAPHER"}>Photographer</MenuItem>
          <MenuItem value={"CUSTOMER"}>Customer</MenuItem>
        </Select>

        {signUpForm.values.role === "PHOTOGRAPHER" && (<TextField type='text' placeholder='Nhập your location' name='location'
          fullWidth value={signUpForm.values.location} onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.location && signUpForm.errors.location !== undefined}
          helperText={signUpForm.touched.location && signUpForm.errors.location} />)}


      </Stack>

      <LoadingButton
        type='submit'
        fullWidth
        size='large'
        variant='contained'
        sx={{ marginTop: 4, fontFamily: '"Nunito", sans-serif', fontSize: '1rem', textTransform: 'none' }}
        loading={isSignUpRequest}

      >
        Đăng ký
      </LoadingButton>

      <Stack justifyContent={"center"} alignItems={"center"} direction={"row"}>
        <Typography sx={{
          fontSize: '0.9rem',
          ...uiConfigs.style.typoLines(1, "left"),
        }}>
          Bạn đã có tài khoản?
        </Typography>

        <Button sx={{ fontFamily: '"Nunito", sans-serif', fontSize: '0.9rem', textTransform: 'none' }}
          onClick={() => switchAuthState()} >
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

export default SignUpModal
