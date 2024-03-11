import React, { Fragment, useState, useEffect } from 'react'
import { Box, Button, Stack, Typography, IconButton, Grid } from '@mui/material';
import uiConfigs from '../configs/ui.config';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import photoApi from '../api/modules/photo.api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import textConfigs from '../configs/text.config';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PhotoReview from '../components/common/PhotoReview';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ServicePackage from '../components/common/ServicePackage';
const PhotoDetailPage = () => {



     const { photo_id } = useParams();

     const { user } = useSelector((state) => state.user);
     const [onRequest, setOnRequest] = useState(false);
     const dispatch = useDispatch();







     return (
          <Fragment>
               <Box
                    sx={{
                         color: 'primary.contrastText',
                         ...uiConfigs.style.mainContent,
                         padding: { xs: '16px', md: '0 4rem' },
                         marginBottom: '4rem'
                    }}
               >
                    {/*Header photo detail */}
                    <Box sx={{ marginTop: { xs: "5rem", md: "8rem", lg: "8rem" } }}>
                         <Typography sx={{
                              ...uiConfigs.style.typoLines(1, "left"),
                              fontSize: { xs: '2rem', md: '3rem', lg: '4rem' },
                              fontWeight: 800,
                              position: 'relative',
                              "::before": {
                                   position: 'absolute',
                                   content: '""',
                                   width: '2rem',
                                   height: '2px',
                                   borderRadius: '10px',
                                   bgcolor: "#C48F56",
                                   bottom: 0,
                              }
                         }}>
                              Redhead
                         </Typography>

                         <Typography
                              sx={{
                                   ...uiConfigs.style.typoLines(1, "left"),
                                   margin: '1rem 0'
                              }}
                         >
                              September 15, 2017
                         </Typography>
                    </Box>
                    {/*End header photo detail */}


                    {/*Content photo detail */}
                    <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} >
                         <Box
                              className='photo_detail_info'
                              sx={{
                                   width: { xs: "100%", sm: "100%", md: "60%" },
                                   margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
                              }}
                         >
                              <Box sx={{
                                   paddingTop: "50%",
                                   borderRadius: '10px',
                                   ...uiConfigs.style.backgroundImage('https://promo-theme.com/novo/wp-content/uploads/2017/08/project4.jpg')
                              }} />

                              <Box>
                                   <Typography
                                        sx={{
                                             ...uiConfigs.style.typoLines(80, 'left'),
                                             padding: { xs: '1rem 0', md: '1.6rem 0' },
                                             position: 'relative',
                                             "::before": {
                                                  content: '""',
                                                  position: 'absolute',
                                                  width: "100%",
                                                  height: '0.6px',
                                                  borderRadius: '10px',
                                                  bgcolor: "rgba(255,255,255,0.6)",
                                                  bottom: 0,
                                                  left: '50%',
                                                  transform: 'translate(-50%, -50%)'
                                             }
                                        }}
                                   >
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

                                   </Typography>


                              </Box>

                              <Box
                                   className="post_button"
                                   sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        padding: '2rem 0',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderBottom: '0.4px solid rgba(255,255,255,0.5)'
                                   }}
                              >
                                   <Stack
                                        direction={"row"}
                                        alignItems={"center"}
                                        sx={{
                                             bgcolor: '#C48F56',
                                             paddingRight: ' 1rem'
                                        }}
                                   >
                                        <IconButton >
                                             <FavoriteBorderIcon></FavoriteBorderIcon>
                                        </IconButton>
                                        <Typography
                                             variant='body1'
                                             sx={textConfigs.style.normalText}
                                        >20 likes</Typography>
                                   </Stack>

                                   <Stack
                                        direction={"row"}
                                        alignItems={"center"}
                                        width={'40%'}
                                        justifyContent={"space-between"}
                                   >
                                        <Box sx={{
                                             display: 'flex',
                                             flexDirection: 'row',
                                             alignItems: 'center',
                                             justifyContent: 'space-around'
                                        }}>
                                             <IconButton >
                                                  <NavigateBeforeIcon></NavigateBeforeIcon>
                                             </IconButton>
                                             <Typography
                                                  variant='body1'
                                                  sx={textConfigs.style.normalText}
                                             >Previous post</Typography>
                                        </Box>

                                        <Box sx={{
                                             width: '1px',
                                             height: '2rem',
                                             bgcolor: '#C48F56',
                                             borderRadius: '10px',
                                             margin: '0 10px'
                                        }} />

                                        <Box sx={{
                                             display: 'flex',
                                             flexDirection: 'row',
                                             alignItems: 'center',
                                             justifyContent: 'space-around'
                                        }}>
                                             <Typography
                                                  variant='body1'
                                                  sx={textConfigs.style.normalText}
                                             >Next post</Typography>
                                             <IconButton >
                                                  <NavigateNextIcon></NavigateNextIcon>
                                             </IconButton>

                                        </Box>
                                   </Stack>
                              </Box>


                         </Box>


                         {/*options */}
                         <Box
                              className='photo_detail_options'
                              sx={{
                                   width: { xs: "100%", sm: "100%", md: "40%" },
                                   margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
                                   border: '0.2px solid rgba(255,255,255,0.6)',
                                   padding: '2rem'
                              }}
                         >

                              <Box>
                                   <Typography sx={{
                                        ...uiConfigs.style.typoLines(1, "left"),
                                        fontSize: { xs: '1.4rem', md: '1.6rem', lg: '1.8rem' },
                                        fontWeight: 500,
                                        position: 'relative',
                                        marginBottom: '1rem',
                                        "::before": {
                                             position: 'absolute',
                                             content: '""',
                                             width: '2rem',
                                             height: '2px',
                                             borderRadius: '10px',
                                             bgcolor: "#C48F56",
                                             bottom: 0,
                                        }
                                   }}>
                                        Service packages
                                   </Typography>


                                   {/**Servies */}

                                   <ServicePackage services={''} />


                              </Box>


                              <Box>
                                   <Typography sx={{
                                        ...uiConfigs.style.typoLines(1, "left"),
                                        fontSize: { xs: '1.4rem', md: '1.6rem', lg: '1.8rem' },
                                        fontWeight: 500,
                                        position: 'relative',
                                        "::before": {
                                             position: 'absolute',
                                             content: '""',
                                             width: '2rem',
                                             height: '2px',
                                             borderRadius: '10px',
                                             bgcolor: "#C48F56",
                                             bottom: 0,
                                        }
                                   }}>
                                        Latest photos
                                   </Typography>

                                   <Grid container spacing={2}>
                                        <Grid item xs={6} sm={4} md={3} key={1}>
                                             <Box sx={{ position: 'relative', paddingTop: '16%' }}>
                                                  <img src={'https://promo-theme.com/novo/wp-content/uploads/2018/10/project45-150x150.jpg'} alt={`Image1`} className={"kj"} />
                                             </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4} md={3} key={1}>
                                             <Box sx={{ position: 'relative', paddingTop: '16%' }}>
                                                  <img src={'https://promo-theme.com/novo/wp-content/uploads/2018/10/project45-150x150.jpg'} alt={`Image1`} className={"kj"} />
                                             </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4} md={3} key={1}>
                                             <Box sx={{ position: 'relative', paddingTop: '16%' }}>
                                                  <img src={'https://promo-theme.com/novo/wp-content/uploads/2018/10/project45-150x150.jpg'} alt={`Image1`} className={"kj"} />
                                             </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4} md={3} key={1}>
                                             <Box sx={{ position: 'relative', paddingTop: '16%' }}>
                                                  <img src={'https://promo-theme.com/novo/wp-content/uploads/2018/10/project45-150x150.jpg'} alt={`Image1`} className={"kj"} />
                                             </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4} md={3} key={1}>
                                             <Box sx={{ position: 'relative', paddingTop: '16%' }}>
                                                  <img src={'https://promo-theme.com/novo/wp-content/uploads/2018/10/project45-150x150.jpg'} alt={`Image1`} className={"kj"} />
                                             </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4} md={3} key={1}>
                                             <Box sx={{ position: 'relative', paddingTop: '16%' }}>
                                                  <img src={'https://promo-theme.com/novo/wp-content/uploads/2018/10/project45-150x150.jpg'} alt={`Image1`} className={"kj"} />
                                             </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4} md={3} key={1}>
                                             <Box sx={{ position: 'relative', paddingTop: '16%' }}>
                                                  <img src={'https://promo-theme.com/novo/wp-content/uploads/2018/10/project45-150x150.jpg'} alt={`Image1`} className={"kj"} />
                                             </Box>
                                        </Grid>

                                   </Grid>
                              </Box>
                         </Box>
                         {/*options */}





                    </Stack>


                    {/*Content photo detail */}

                    <Box
                         sx={{
                              width: { xs: "100%", sm: "100%", md: "76%" },
                              margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
                         }}
                    >
                         <PhotoReview />


                    </Box>



               </Box>
          </Fragment>
     )
};

export default PhotoDetailPage;
