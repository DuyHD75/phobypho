import React, { useState, useEffect } from 'react'
import UserSidebar from '../components/common/UserSidebar';
import { Box, Stack, TextField, Button, Alert, Select, MenuItem, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import uiConfigs from '../configs/ui.config';
import AvatarUploader from '../components/common/AvatarUploader';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import * as Yup from 'yup';
import userApi from '../api/modules/user.api';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const Profile = () => {

   const dispatch = useDispatch();
   const [errorMessage, setErrorMessage] = useState(undefined);
   const [isUpdateRequest, setIsUpdateRequest] = useState(false);
   const [avatarUrl, setAvatarUrl] = useState('');
   const [location, setLocation] = useState('');

   const { user } = useSelector(state => state.user);

   useEffect(() => {
      setAvatarUrl(user.avatar);
      if (user.location) {
         setLocation(user.location || user.updatedUser.location);
      }
   }, [user]);

   const profileForm = useFormik({
      initialValues: {
         displayName: user?.displayName,
         phoneNumber: user?.phoneNumber,
         email: user?.email,
         avatar: user?.avatar,
         location: user.role === 'PHOTOGRAPHER' ? user.location || user.updatedUser.location : '',
      },
      validationSchema: Yup.object({
         displayName: Yup.string()
            .min(8, "Display name at least 8 characters hhh !")
            .required("Display name is required !"),
         phoneNumber: Yup.string()
            .matches(/^0\d{9}$/, 'Phone number is not valid')
            .required("Phone number is required!"),
         email: Yup.string()
            .email()
            .required("Email is required !"),
         location: user.role === 'PHOTOGRAPHER' ? Yup.string().required("Location is required") : Yup.string(),

      }),
      onSubmit: async values => {

         setErrorMessage(undefined);
         setIsUpdateRequest(true)
         values.avatar = avatarUrl;
         const { response, err } = await userApi.updateInfo(values);
         setIsUpdateRequest(false)

         if (response) {
            profileForm.resetForm();
            dispatch(setUser(response));

            toast.success("Cập nhật thông tin thành công !");
         }
         if (err) {
            setErrorMessage(err.message);
         }
      }
   })

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
         }}>Cập nhật thông tin </Typography>

         {/* Avatar uploader */}
         <AvatarUploader handleUpload={setAvatarUrl} avatar={user.avatar} />
         {/* Avatar uploader */}


         <Box component="form" onSubmit={profileForm.handleSubmit}
            sx={{
               ...uiConfigs.style.typoLines(1, 'center'),
               color: "secondary.colorText",
               marginTop: 4,
            }}
         >
            <Stack spacing={2}>

               <TextField type='text' placeholder='Enter your display name' name='displayName'
                  fullWidth value={profileForm.values.displayName} 
                  onChange={profileForm.handleChange}
                  error={profileForm.touched.displayName && profileForm.errors.displayName !== undefined}
                  helperText={profileForm.touched.displayName && profileForm.errors.displayName}
               >
               </TextField>

               <TextField type='text' placeholder='Enter your phone number' name='phoneNumber'
                  value={profileForm.values.phoneNumber} onChange={profileForm.handleChange}
                  error={profileForm.touched.phoneNumber && profileForm.errors.phoneNumber !== undefined}
                  helperText={profileForm.touched.phoneNumber && profileForm.errors.phoneNumber}
               >
               </TextField>

               <TextField type='email' placeholder='Enter your email' name='email'
                  fullWidth value={profileForm.values.email} onChange={profileForm.handleChange} x
                  error={profileForm.touched.email && profileForm.errors.email !== undefined}
                  helperText={profileForm.touched.email && profileForm.errors.email}
               >
               </TextField>

               {user.role === 'PHOTOGRAPHER' && (
                  <TextField type='text' placeholder='Enter your location' name='location'
                     error={profileForm.touched.location && profileForm.errors.location !== undefined}
                     value={profileForm.values.location} onChange={profileForm.handleChange}
                     helperText={profileForm.touched.location && profileForm.errors.location}
                  >
                  </TextField>)
               }

            </Stack>

            <LoadingButton
               type='submit'
               variant='contained'
               size='small'
               sx={{
                  ...uiConfigs.style.typoLines(1, 'center'),
                  margin: '0 auto',
                  marginTop: 4,
                  width: 'fit-content'
               }}
               loading={isUpdateRequest}
            >
               Cập nhật
            </LoadingButton>

            {errorMessage && (
               <Box sx={{ marginTop: 2 }}>
                  <Alert severity='error' variant='outlined'>{errorMessage}</Alert>
               </Box>
            )}

         </Box>





      </UserSidebar>
   );
};

export default Profile;
