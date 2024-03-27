import React, { Fragment, useState } from 'react'
import Container from '../components/common/Container';
import uiConfigs from '../configs/ui.config';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PhotoUploader from '../components/common/PhotoUploader';
import ServicePackForm from '../components/common/ServicePackForm';
import ServicePackageGrid from '../components/common/ServicePackageGrid';



const PostPhoto = () => {

     const [title, setTitle] = useState('');
     const [address, setAddress] = useState('');
     const [addedPhotos, setAddedPhotos] = useState([]);
     const [description, setDescription] = useState('');
     const [servicePackages, setServicePackages] = useState([]);
     const [openModal, setOpenModal] = useState(false);




     const postPhotoForm = useFormik({
          initialValues: {
               title: "",
               descriptions: "",
               poster: "",
               name: "",
               description: "",
               price: "",
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

          }
     });

     const headerAndSubHeaderOfInput = (header, description) => {
          return (
               <Box sx={{ padding: '1rem 0' }}>
                    <Typography sx={{ ...uiConfigs.style.typoLines(1, 'left'), color: '#C48F56' }}
                         variant='h5'>
                         {header}
                    </Typography>
                    <Typography sx={{ ...uiConfigs.style.typoLines(1, 'left'), color: '#FFF' }}
                         variant='p'>
                         {description}
                    </Typography>
               </Box>
          )
     }

     return (
          <Fragment>
               <Box
                    sx={{
                         position: 'relative',
                         ...uiConfigs.style.mainContent,
                    }}
               >
                    <Box sx={{ padding: '10%', display: 'flex' }}>
                         <Container header={'Post Photo'} size={'3rem'}>
                              <Box component={'form'} sx={{
                                   width: '1000px',
                                   display: 'flex',
                                   flexDirection: 'column',
                              }} >

                                   {headerAndSubHeaderOfInput('Title', "Title for your photo. should be short and catchy as in advertisement")}
                                   <TextField type='text' placeholder='Enter your title' name='title'
                                        fullWidth value={postPhotoForm.values.title} onChange={postPhotoForm.handleChange} color='warning'
                                        error={postPhotoForm.touched.title && postPhotoForm.errors.title !== undefined}
                                        helperText={postPhotoForm.touched.title && postPhotoForm.errors.title}
                                   />

                                   {headerAndSubHeaderOfInput('Descriptions', "Description for your photo. should be short and catchy as in advertisement")}
                                   <TextField type='text' placeholder='Enter your descriptions' name='descriptions'
                                        fullWidth value={postPhotoForm.values.descriptions} onChange={postPhotoForm.handleChange} color='warning'
                                        error={postPhotoForm.touched.descriptions && postPhotoForm.errors.descriptions !== undefined}
                                        helperText={postPhotoForm.touched.descriptions && postPhotoForm.errors.descriptions}
                                   />

                                   {headerAndSubHeaderOfInput('Photos ', "Upload your photo performance")}
                                   <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                                   {headerAndSubHeaderOfInput('Service Packages ', "Create your service packages")}
                                   <ServicePackageGrid servicePackages={servicePackages} setOpenModal={setOpenModal} />
                                   <ServicePackForm
                                        servicePackages={servicePackages}
                                        onChange={setServicePackages}
                                        openModal={openModal}
                                        setOpenModal={setOpenModal}

                                   />
                              </Box>

                         </Container>

                    </Box>
               </Box>

          </Fragment>
     )
}

export default PostPhoto;
