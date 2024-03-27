import React, { Fragment, useState } from 'react'
import { Stack, TextField, Button, Modal } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux'

const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: '100%',
     bgcolor: 'background.paper',
     border: '2px solid #555',
     boxShadow: 24,
     p: 4,
     maxWidth: '500px',
     overflow: 'hidden'
};

const ServicePackForm = ({ servicePackages, setServicePackages, openModal, setOpenModal }) => {



     const serviceForm = useFormik({
          initialValues: {
               name: '',
               price: 0,
               description: ''
          },
          validationSchema: Yup.object({
               name: Yup.string()
                    .required("Name is required !"),
               price: Yup.string()
                    .required("Price is required !"),
               description: Yup.string()
                    .required("Descriptions is required !")
          }),
          onSubmit: async values => {
               console.log(values)
               setServicePackages([servicePackages, ...values]);
               setOpenModal(false)
          }
     });


     return (
          <Fragment>
               <Modal
                    open={openModal} sx={style}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onClose={() => setOpenModal(false)}
               >
                    <Stack >
                         <TextField
                              sx={{
                                   marginBottom: '1rem'
                              }}
                              label="Service Name"
                              type='text' name='name'
                              fullWidth value={serviceForm.values.name} onChange={serviceForm.handleChange} color='warning'
                              error={serviceForm.touched.name && serviceForm.errors.name !== undefined}
                              helperText={serviceForm.touched.name && serviceForm.errors.name}
                              required
                         />
                         <TextField
                              label="Price"
                              sx={{
                                   marginBottom: '1rem'
                              }}
                              required
                              type='number' name='price'
                              fullWidth value={serviceForm.values.price} onChange={serviceForm.handleChange} color='warning'
                              error={serviceForm.touched.price && serviceForm.errors.price !== undefined}
                              helperText={serviceForm.touched.price && serviceForm.errors.price}
                         />
                         <TextField
                              label="Description"
                              multiline
                              sx={{
                                   marginBottom: '1rem'
                              }}
                              rows={4}
                              required
                              type='number' name='description'
                              fullWidth value={serviceForm.values.description} onChange={serviceForm.handleChange} color='warning'
                              error={serviceForm.touched.description && serviceForm.errors.description !== undefined}
                              helperText={serviceForm.touched.description && serviceForm.errors.description}
                         />

                         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: 'max-content', display: "flex", margin: '0 auto' }} >
                              Create Service Package
                         </Button>
                    </Stack>

               </Modal>
          </Fragment>
     )
}

export default ServicePackForm;