import React, { useState } from 'react';
import { Box, Stack, TextField,  Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import UserSidebar from './UserSidebar';
import uiConfigs from '../../configs/ui.config';
import { LoadingButton } from '@mui/lab';
import { setUser } from '../../redux/features/userSlice';
import userApi from '../../api/modules/user.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';

const ChangePassword = () => {


   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [requestProcessing, setRequestProcessing] = useState(false);

   const [errorMessage, setErrorMessage] = useState();
   const [role, setRole] = useState();

   const handleRoleChange = (event) => {
      setRole(event.target.value);
   }

   const form = useFormik({
      initialValues: {
         password: "",
         newPassword: "",
         confirmNewPassword: ""
      },
      validationSchema: Yup.object({
         password: Yup.string()
            .min(8, "Mật khẩu phải có ít nhất 8 ký tự!")
            .required("Cần nhập trường này !"),
         newPassword: Yup.string()
            .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự !")
            .required("Cần nhập trường này !"),
         confirmNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Xác nhận mật khẩu không khớp !")
            .min(8, "Xác nhận mật khẩu phải có ít nhất 8 ký tự!")
            .required("Cần nhập trường này !")
      }),
      onSubmit: async values => onUpdate(values)
   });

   const onUpdate = async (values) => {
      if (requestProcessing) return;
      setRequestProcessing(true);

      const { response, err } = await userApi.passwordUpdate(values);
      setRequestProcessing(false);
      if (err) toast.error(err.message);
      if (response) {
         form.resetForm();
         navigate("/");
         dispatch(setUser(null));
         dispatch(setAuthModalOpen(true));
         toast.success("Update password success! Please re-login");
      }
   };

   return (
      <UserSidebar>
         <Typography sx={{
            ...uiConfigs.style.typoLines(1, 'left'),
            fontSize: '1rem',
            color: 'primary.headerColor',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '2rem',
            bgcolor: '#172149',
            padding: '1rem',
            borderRadius: '10px',
            border: '2px solid rgba(255,255,255,0.1)',
         }}>Đổi Mật Khẩu </Typography>

         <Box component="form" onSubmit={form.handleSubmit} >
            <Stack spacing={2}>
               <TextField
                  type="password"
                  placeholder="Previous password"
                  name="password"
                  fullWidth
                  value={form.values.password}
                  onChange={form.handleChange}
                  color="success"
                  error={form.touched.password && form.errors.password !== undefined}
                  helperText={form.touched.password && form.errors.password}
               />
               <TextField
                  type="password"
                  placeholder="New password"
                  name="newPassword"
                  fullWidth
                  value={form.values.newPassword}
                  onChange={form.handleChange}
                  color="success"
                  error={form.touched.newPassword && form.errors.newPassword !== undefined}
                  helperText={form.touched.newPassword && form.errors.newPassword}
               />
               <TextField
                  type="password"
                  placeholder="Confirm new password"
                  name="confirmNewPassword"
                  fullWidth
                  value={form.values.confirmNewPassword}
                  onChange={form.handleChange}
                  color="success"
                  error={form.touched.confirmNewPassword && form.errors.confirmNewPassword !== undefined}
                  helperText={form.touched.confirmNewPassword && form.errors.confirmNewPassword}
               />
               <LoadingButton
                  type='submit'
                  fullWidth
                  size='small'
                  variant='contained'
                  sx={{
                     ...uiConfigs.style.typoLines(1, 'center'),
                     width: 'fit-content',
                     margin: '0 auto',
                     marginTop: 4,
                  }}
                  loading={requestProcessing}
               >
                  Cập nhât
               </LoadingButton>
            </Stack>
         </Box>
      </UserSidebar>
   )
}

export default ChangePassword
