import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import uiConfigs from '../../configs/ui.config';
import { routesGen } from '../../routers/routes';


const PhotographerItem = ({ photo }) => {
     return (
          <Link to={routesGen.photoDetail(photo.id)} style={{ textDecoration: 'none' }} >
               <Box sx={{
                    ...uiConfigs.style.backgroundImage(photo.img),
                    paddingTop: "70%",
                    transition: 'all .9s ease',
                    "&:hover .photo-option": {
                         top: { xs: '20%', md: '35%', lg: '45%' },
                         opacity: 1,
                         transition: 'all .9s ease'
                    },
                    color: "primary.contrastText",
                    boxShadow: 3,
                    borderColor: 'primary.main'
               }}>
                    <Fragment>
                         <Box className="photo-back-drop" sx={{
                              opacity: { xs: 1, md: 0 },
                              transition: "all .5s ease",
                              width: "100%",
                              height: "100%",
                              position: "absolute",
                              top: 0,
                              left: 0,
                              backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
                         }} />

                         <Box
                              className="photo-info"
                              sx={{
                                   transition: "all .5s ease",
                                   textAlign: 'center',
                                   position: 'relative',
                                   top: { xs: '-6rem', md: '-24rem', sm: '-20rem' },
                                   width: "100%",
                                   height: "max-content",
                                   boxSizing: "border-box",
                                   padding: { xs: "10px", md: "2rem 1rem" }
                              }}
                         >
                              <Stack spacing={{ xs: 1, md: 2 }} direction={'column'} alignItems={"center"}>
                                   <Typography
                                        variant="body1"
                                        fontWeight="600"

                                        sx={{
                                             fontSize: "1rem",
                                             ...uiConfigs.style.typoLines(1, "center")
                                        }}
                                   >
                                        {"LIFESTYLE SESSION"}
                                   </Typography>
                                   <Typography
                                        variant="body1"
                                        fontWeight="700"
                                        sx={{
                                             fontSize: { xs: '3rem', md: '4rem' },
                                             ...uiConfigs.style.typoLines(1, "center")
                                        }}
                                   >
                                        {'$69'}
                                   </Typography>
                                   <Button
                                        sx={{
                                             bgcolor: '#C48F56',
                                             width: "max-content",
                                             height: 'max-content',
                                             fontSize: '0.8rem',
                                             color: '#fff',
                                             padding: "4px 1rem",
                                             ...uiConfigs.style.typoLines(1, "center"),
                                             zIndex: 10
                                        }}
                                   >
                                        PURCHASE
                                   </Button>
                              </Stack>
                         </Box>

                         <Box
                              className="photo-option"
                              sx={{
                                   transition: "all .8s ease",
                                   position: 'absolute',
                                   width: "100%",
                                   opacity: 0,
                                   height: "max-content",
                                   boxSizing: "border-box",
                                   padding: { xs: "10px", md: "2rem 1rem" },
                                   backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
                              }}
                         >
                              <Stack spacing={3} direction={'column'}>
                                   <Typography
                                        variant='h3'
                                        sx={{
                                             fontSize: '1.4rem',
                                             fontWeight: '800',
                                             ...uiConfigs.style.typoLines(1, 'center'),
                                             position: 'relative',
                                             padding: '0.6rem',
                                             "&::before": {
                                                  content: '""',
                                                  position: 'absolute',
                                                  width: '20%',
                                                  height: '2px',
                                                  bgcolor: '#c48F56',
                                                  bottom: 0,
                                                  borderRadius: '5px',
                                                  left: '50%',
                                                  transform: 'translate(-50%, -50%)'
                                             }
                                        }}
                                   >Session Parameters:</Typography>


                                   <Typography
                                        sx={{
                                             fontSize: '1rem',
                                             ...uiConfigs.style.typoLines(1, 'center'),
                                             position: 'relative',
                                             padding: '0.6rem',
                                             "&::before": {
                                                  content: '""',
                                                  position: 'absolute',
                                                  width: '2rem',
                                                  height: '3px',
                                                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                                                  bottom: 0,
                                                  borderRadius: '5px',
                                                  left: '50%',
                                                  transform: 'translate(-50%, -50%)'
                                             }
                                        }}
                                   >One Classic Certified Photographer</Typography>


                                   <Typography
                                        sx={{
                                             fontSize: '1rem',
                                             fontWeight: '400',
                                             ...uiConfigs.style.typoLines(1, 'center'),
                                             position: 'relative',
                                             padding: '0.6rem',
                                             "&::before": {
                                                  content: '""',
                                                  position: 'absolute',
                                                  width: '2rem',
                                                  height: '3px',
                                                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                                                  bottom: 0,
                                                  borderRadius: '5px',
                                                  left: '50%',
                                                  transform: 'translate(-50%, -50%)'
                                             }
                                        }}
                                   >5 Hours of Photography Coverage</Typography>


                                   <Typography
                                        sx={{
                                             fontSize: '1rem',
                                             fontWeight: '400',
                                             ...uiConfigs.style.typoLines(1, 'center'),
                                             position: 'relative',
                                             padding: '0.6rem',
                                             "&::before": {
                                                  content: '""',
                                                  position: 'absolute',
                                                  width: '2rem',
                                                  height: '3px',
                                                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                                                  bottom: 0,
                                                  borderRadius: '5px',
                                                  left: '50%',
                                                  transform: 'translate(-50%, -50%)'
                                             }
                                        }}
                                   >High Resolution Images</Typography>

                                   <Typography
                                        sx={{
                                             fontSize: '1rem',
                                             fontWeight: '400',
                                             ...uiConfigs.style.typoLines(1, 'center'),
                                             position: 'relative',
                                             padding: '0.6rem',
                                             "&::before": {
                                                  content: '""',
                                                  position: 'absolute',
                                                  width: '2rem',
                                                  height: '3px',
                                                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                                                  bottom: 0,
                                                  borderRadius: '5px',
                                                  left: '50%',
                                                  transform: 'translate(-50%, -50%)'
                                             }
                                        }}
                                   >Interest Free, Low Monthly Payment Plan</Typography>
                              </Stack>
                         </Box>
                    </Fragment>

               </Box>
          </Link >
     )
}

export default PhotographerItem;
