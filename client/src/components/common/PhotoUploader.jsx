import React, { Fragment, useState } from 'react'
import { Box, Typography, Stack, TextField, Grid, Button, IconButton, } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';

const PhotoUploader = ({ addedPhotos, onChange }) => {

     const [photoLink, setPhotoLink] = useState('');
     async function addPhotoByLink(ev) {
          ev.preventDefault();
          const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
          onChange(prev => {
               return [...prev, filename];
          });
          setPhotoLink('');
     }
     function uploadPhoto(ev) {
          const files = ev.target.files;
          const data = new FormData();
          for (let i = 0; i < files.length; i++) {
               data.append('photos', files[i]);
          }
          axios.post('/upload', data, {
               headers: { 'Content-type': 'multipart/form-data' }
          }).then(response => {
               const { data: filenames } = response;
               onChange(prev => {
                    return [...prev, ...filenames];
               });
          })
     }
     function removePhoto(ev, filename) {
          ev.preventDefault();
          onChange([...addedPhotos.filter(photo => photo !== filename)]);
     }

     function selectAsMainPhoto(ev, filename) {
          ev.preventDefault();
          onChange([filename, ...addedPhotos.filter(photo => photo !== filename)]);
     }




     return (
          <Box>
               <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <TextField type='text' placeholder='Add using link ... jpg'
                         name='descriptions'
                         value={photoLink}
                         label="Add your photo link ..."
                         onChange={e => setPhotoLink(e.target.value)}
                         color='warning'
                         sx={{ width: '87%' }}
                    />
                    <Button variant='contained' sx={{ padding: '10px' }}>Add Photo</Button>
               </Stack>

               <Grid container spacing={2} sx={{ margin: '2rem 0' }}>
                    <Grid item
                         xs={6} sm={4}
                         md={3} lg={2}
                         key={'1'}
                         sx={{
                              position: 'relative',
                              height: '12rem'
                         }}
                    >
                         <img
                              style={{
                                   borderRadius: "5px",
                                   width: '100%',
                                   height: '100%',
                                   objectFit: "cover",
                                   boxShadow: '2px 2px 5px rgba(255,255,255, 0.6)',
                                   overflow: 'hidden'
                              }}
                              src={'https://promo-theme.com/novo/wp-content/uploads/2017/08/slide7.jpg'} alt=""
                         />

                         <Box
                              sx={{
                                   position: 'absolute',
                                   bottom: 0,
                                   display: 'flex',
                                   alignItems: "center",
                                   justifyContent: 'space-around',
                                   width: '100%'

                              }}
                         >
                              <IconButton
                                   sx={{
                                        cursor: 'pointer',
                                        color: "#fff",
                                        borderRadius: '10px',
                                        padding: '10px'
                                   }}
                                   onClick={(ev) => removePhoto(ev, 'https://promo-theme.com/novo/wp-content/uploads/2017/08/slide7.jpg')}
                                   className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl">
                                   <DeleteIcon sx={{ fontSize: '1.3rem' }} />
                              </IconButton>

                              <IconButton
                                   sx={{
                                        cursor: 'pointer',
                                        color: "#fff",
                                        borderRadius: '10px',
                                        padding: '10px'
                                   }}
                                   onClick={(ev) => selectAsMainPhoto(ev, 'https://promo-theme.com/novo/wp-content/uploads/2017/08/slide7.jpg')}
                              >
                                   {'https://promo-theme.com/novo/wp-content/uploads/2017/08/slide7.jpg' === addedPhotos[0] ? <CheckCircleIcon sx={{ fontSize: '1.3rem' }} /> : <StarIcon sx={{ fontSize: '1.4rem' }} />}
                              </IconButton>
                         </Box>

                    </Grid>

                    <Grid item xs={6} sm={4} md={3} lg={2}  height={'12rem'}  >
                         <label htmlFor="upload-photo" style={{
                              display: 'flex',
                              alignItems: "center",
                              height: '100%',
                              justifyContent: 'center',
                              border: '1px solid #333',
                              borderRadius: '10px',
                              flexDirection: 'column',
                         }} >
                              <input id="upload-photo" type="file" multiple style={{ display: 'none' }} onChange={uploadPhoto} />
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '4.4rem', }}>
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                              </svg>
                              Upload
                         </label>
                    </Grid>
               </Grid>


          </Box>
     );
};

export default PhotoUploader;
