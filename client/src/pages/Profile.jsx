import React, { useState, useEffect, Fragment } from 'react'
import UserSidebar from '../components/common/UserSidebar';
import { Box, Stack, TextField, Alert, Select, MenuItem, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import uiConfigs from '../configs/ui.config';
import AvatarUploader from '../components/common/AvatarUploader';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import * as Yup from 'yup';
import userApi from '../api/modules/user.api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
const Profile = () => {

   const { user } = useSelector(state => state.user);

   const dispatch = useDispatch();
   const [errorMessage, setErrorMessage] = useState(undefined);
   const [isUpdateRequest, setIsUpdateRequest] = useState(false);
   const [avatarUrl, setAvatarUrl] = useState('');
   const [location, setLocation] = useState('');




   useEffect(() => {
      setAvatarUrl(user.userData.account.avatar);
      if (user.userData.location) {
         setLocation(user.userData.location || user.updatedUser.location);
      }
   }, []);

   const handleAvatarUpload = async (avatarLink) => {
      console.log(avatarLink)
      setAvatarUrl(avatarLink);
   }

   
   const profileForm = useFormik({
      initialValues: {
         displayName: user.userData.account.displayName,
         phoneNumber: user.userData.account.phoneNumber,
         email: user.userData.account.email,
         avatar: user.userData.account.avatar,
         location: user.userData.account.role === 'PHOTOGRAPHER' ? user.userData.location : '',
         gender: user.userData.account.role === 'PHOTOGRAPHER' ? user.userData.gender : '',
         age: user.userData.account.role === 'PHOTOGRAPHER' ? user.userData.age : '',
         experienceYears: user.userData.account.role === 'PHOTOGRAPHER' ? user.userData.experienceYears : '',
         description: user.userData.account.role === 'PHOTOGRAPHER' ? user.userData.description : '',
         serialNumber: user.userData.account.role === 'PHOTOGRAPHER' ? user.userData?.serialNumber : '',
         bankName: user.userData.account.role === 'PHOTOGRAPHER' ? user.userData?.bankName : '',
         
      },
      validationSchema: Yup.object({
         displayName: Yup.string()
            .min(8, "Display name at least 8 characters !")
            .required("Display name is required !"),
         phoneNumber: Yup.string()
            .matches(/^0\d{9}$/, 'Phone number is not valid')
            .required("Phone number is required!"),
         email: Yup.string()
            .email()
            .required("Email is required !"),
         location: user.userData.account.role === 'PHOTOGRAPHER' ? Yup.string().required("Location is required.") : Yup.string(),
         gender: user.userData.account.role === 'PHOTOGRAPHER' ? Yup.string().required("Gender is required.") : Yup.string(),
         age: user.userData.account.role === 'PHOTOGRAPHER' ? Yup.number().positive("Age should be a positive number.").required("Age is required.") : Yup.number(),
         experienceYears: user.userData.account.role === 'PHOTOGRAPHER' ?
            Yup.number().positive("Experience years should be a positive number.").required("Experience years is required.") :
            Yup.number(),
         description: user.role === 'PHOTOGRAPHER' ? Yup.string().required("Description is required.") : Yup.string(),
         serialNumber: user.role === 'PHOTOGRAPHER' ? Yup.string().matches(/^0\d{9}$/, 'Phone number is not valid')
         .required("Serial number is required.") : Yup.string(),
         bankName: user.role === 'PHOTOGRAPHER' ? Yup.string().required("Bank name is required.") : Yup.string(),
      }),
      enableReinitialize: true,
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
         <AvatarUploader handleUpload={handleAvatarUpload} avatar={user.userData.account.avatar} />
         {/* Avatar uploader */}


         <Box component="form" onSubmit={profileForm.handleSubmit}
            sx={{
               ...uiConfigs.style.typoLines(1, 'center'),
               color: "secondary.colorText",
               marginTop: 2,
               paddingTop: '1rem',
            }}
         >
            <Stack spacing={2}>

               <TextField type='text' placeholder='Enter your display name' name='displayName'
                  fullWidth value={profileForm.values.displayName}
                  onChange={profileForm.handleChange}
                  error={profileForm.touched.displayName && profileForm.errors.displayName !== undefined}
                  helperText={profileForm.touched.displayName && profileForm.errors.displayName}
                  label='Tên Đại Diện'

               >
               </TextField>

               <TextField type='text' placeholder='Enter your phone number' name='phoneNumber'
                  value={profileForm.values.phoneNumber} onChange={profileForm.handleChange}
                  error={profileForm.touched.phoneNumber && profileForm.errors.phoneNumber !== undefined}
                  helperText={profileForm.touched.phoneNumber && profileForm.errors.phoneNumber}
                  label='Số Điện Thoại'
               >
               </TextField>

               <TextField type='email' placeholder='Enter your email' name='email'
                  fullWidth value={profileForm.values.email} onChange={profileForm.handleChange} x
                  error={profileForm.touched.email && profileForm.errors.email !== undefined}
                  helperText={profileForm.touched.email && profileForm.errors.email}
                  label='Email'
               >
               </TextField>

               {user.userData.account.role === 'PHOTOGRAPHER' && (
                  <Fragment >
                     <TextField type='text' placeholder='Enter your location' name='location'
                        error={profileForm.touched.location && profileForm.errors.location !== undefined}
                        value={profileForm.values.location} onChange={profileForm.handleChange}
                        helperText={profileForm.touched.location && profileForm.errors.location}
                        label='Địa Chỉ' fullWidth
                     >
                     </TextField>

                     <Stack flexDirection={{ sx: 'column', md: 'row' }} justifyContent={'space-between'} alignItems={"center"}>
                        <Box sx={{ width: '45%', position: 'relative' }}>



                           <FormControl fullWidth>
                              <InputLabel id="demo-select-small-label">Giới tính</InputLabel>
                              <Select
                                 labelId="demo-select-small-label"
                                 id="demo-select-small"
                                 value={profileForm.values.gender}
                                 label="Gender"
                                 name="gender"
                                 onChange={profileForm.handleChange}
                              >
                                 <MenuItem value="">
                                    <em>None</em>
                                 </MenuItem>
                                 <MenuItem value={"Nam"}>Nam</MenuItem>
                                 <MenuItem value={"Nữ"}>Nữ</MenuItem>
                              </Select>
                           </FormControl>
                        </Box>

                        <TextField type='number' placeholder='Nhập số năm kinh nghiệm' name='experienceYears'
                           label='Số Năm Kinh Nghiệm'
                           sx={{ width: '45%' }}
                           value={profileForm.values.experienceYears} onChange={profileForm.handleChange}
                           error={profileForm.touched.experienceYears && profileForm.errors.experienceYears !== undefined}
                           helperText={profileForm.touched.experienceYears && profileForm.errors.experienceYears}
                        />
                     </Stack>
                     <TextField type='number' placeholder='Nhập tuổi của bạn' name='age'
                        value={profileForm.values.age} onChange={profileForm.handleChange}
                        error={profileForm.touched.age && profileForm.errors.age !== undefined}
                        helperText={profileForm.touched.age && profileForm.errors.age}
                        label='Số Tuổi'
                     />

                     <TextField type='text' placeholder='Nhập mô tả về bạn' name='description'
                        value={profileForm.values.description} onChange={profileForm.handleChange}
                        error={profileForm.touched.description && profileForm.errors.description !== undefined}
                        helperText={profileForm.touched.description && profileForm.errors.description}
                        minRows={4} multiline fullWidth maxRows={6}
                        label='Mô Tả Về Bạn'
                     />
                     <TextField type='text' placeholder='Nhập số tài khoản của bạn' name='serialNumber'
                        value={profileForm.values.serialNumber} onChange={profileForm.handleChange}
                        error={profileForm.touched.serialNumber && profileForm.errors.serialNumber !== undefined}
                        helperText={profileForm.touched.serialNumber && profileForm.errors.serialNumber}
                        label='Số Tài Khoản Của Bạn'
                     />
                     <TextField type='text' placeholder='Nhập tên ngân hàng của bạn' name='bankName'
                        value={profileForm.values.bankName} onChange={profileForm.handleChange}
                        error={profileForm.touched.bankName && profileForm.errors.bankName !== undefined}
                        helperText={profileForm.touched.bankName && profileForm.errors.bankName}
                        label='Tên Ngân Hàng Của Bạn'
                     />
                  </Fragment>
               )}

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
