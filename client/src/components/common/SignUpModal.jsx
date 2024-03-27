import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import userApi from '../../api/modules/user.api';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from '../../redux/features/userSlice';
import { toast } from 'react-toastify';
import { Box, Stack, TextField, Button, Alert, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';






const SignUpModal = ({ switchAuthState }) => {

  const dispatch = useDispatch();

  const { authoModalOpen } = useSelector((state) => state.authModal);
  const [isSignUpRequest, setIsSignUpRequest] = useState(false);

  const [errorMessage, setErrorMessage] = useState();
  const [role, setRole] = useState();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  }

  const signUpForm = useFormik({
    initialValues: {
      username: "",
      displayName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Username at least 8 characters !")
        .required("Username is required !"),
      displayName: Yup.string()
        .min(8, "Display name at least 8 characters !")
        .required("Display name is required !"),
      phoneNumber: Yup.string()
        .matches(/^0\d{9}$/, 'Phone number is not valid')
        .required("Phone number is required!"),
      email: Yup.string()
        .email()
        .required("Email is required !"),
      password: Yup.string()
        .min(8, "Password at least 8 character !")
        .required("Password is required !"),
      confirmPassword: Yup.string()
        .min(8, "ConfirmPassword minimum 8 characters")
        .required("ConfirmPassword is required"),
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
      <Stack spacing={2}>
        <TextField type='text' placeholder='Enter your username' name='username'
          fullWidth value={signUpForm.values.username} onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.username && signUpForm.errors.username !== undefined}
          helperText={signUpForm.touched.username && signUpForm.errors.username}
        >
        </TextField>
        <TextField type='text' placeholder='Enter your display name' name='displayName'
          fullWidth value={signUpForm.values.displayName} onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.displayName && signUpForm.errors.displayName !== undefined}
          helperText={signUpForm.touched.displayName && signUpForm.errors.displayName}
        >
        </TextField>
        <TextField type='text' placeholder='Enter your phone number' name='phoneNumber'
          fullWidth value={signUpForm.values.phoneNumber} onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.phoneNumber && signUpForm.errors.phoneNumber !== undefined}
          helperText={signUpForm.touched.phoneNumber && signUpForm.errors.phoneNumber}
        >
        </TextField>
        <TextField type='email' placeholder='Enter your email' name='email'
          fullWidth value={signUpForm.values.email} onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.email && signUpForm.errors.email !== undefined}
          helperText={signUpForm.touched.email && signUpForm.errors.email}
        >
        </TextField>
        <TextField type='password' placeholder='Enter your password' name='password'
          fullWidth value={signUpForm.values.password}
          onChange={signUpForm.handleChange} color='warning'
          error={signUpForm.touched.password && signUpForm.errors.password !== undefined}
          helperText={signUpForm.touched.password && signUpForm.errors.password}
        >
        </TextField>
        <TextField type='password' placeholder='Enter your confirm password' name='confirmPassword'
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
        >
          <MenuItem value={"PHOTOGRAPHER"}>Photographer</MenuItem>
          <MenuItem value={"CUSTOMER"}>Customer</MenuItem>
        </Select>
      </Stack>

      <LoadingButton
        type='submit'
        fullWidth
        size='large'
        variant='contained'
        sx={{ marginTop: 4 }}
        loading={isSignUpRequest}
      >
        Sign Up
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()} >
        Log In
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity='error' variant='outlined'>{errorMessage}</Alert>
        </Box>
      )}

    </Box>
  )
}

export default SignUpModal
