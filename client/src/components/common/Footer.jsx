import React from 'react'
import { Box, Paper, Stack, Button, Typography, Divider, TextField } from '@mui/material';
import uiConfigs from '../../configs/ui.config';
import Logo from './Logo';
import menuConfigs from '../../configs/menu.config';
import { Link } from 'react-router-dom';
import Container from './Container';
import { BiMailSend } from "react-icons/bi";

const Footer = () => {
     return (
          <Container>
               <Paper
                    square={true}
                    sx={{
                         backgroundColor: "secondary.main",
                         padding: "2rem",
                         paddingX: "4rem",
                         height: "340px",
                    }}
               >
                    <Stack
                         justifyContent="space-around"
                         direction={{
                              sx: "column", md: "row"
                         }}
                         sx={{ height: "100%" }}
                    >

                         <Logo isHeader={true}></Logo>
                         <Box
                              sx={{
                                   marginTop: { xs: '1rem', md: 0 }
                              }}
                         >
                              {menuConfigs.main.map((item, index) => (
                                   <Button
                                        key={index}
                                        sx={{
                                             color: 'secondary.contrastText',
                                             fontFamily: '"Nunito", sans-serif',
                                             fontSize: '0.9rem',
                                        }}
                                        component={Link}
                                        to={item.path}
                                   >
                                        {item.display}
                                   </Button>
                              ))}



                              <Box sx={{
                                   marginTop: '2rem',
                                   display: 'flex',
                                   flexDirection: 'column',

                              }}>
                                   <Box>
                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'center'),
                                             fontSize: '1.2rem',
                                             fontWeight: '700',
                                             padding: '1rem',
                                             textTransform: 'uppercase',
                                             color: '#000'
                                        }}>Liên Hệ Với Chúng Tôi</Typography>
                                        <Typography
                                             sx={{
                                                  color: "#fff",
                                                  textTransform: 'uppercase',
                                                  fontWeight: '800',
                                                  fontSize: '1.4rem',
                                                  textAlign: 'center', 
                                                  marginBottom: '1rem' ,
                                                  textShadow: '1px 1px 1px #000'
                                             }}
                                        >PHOBYPHO.Service@gmail.com</Typography>

                                        <Typography sx={{
                                             ...uiConfigs.style.typoLines(1, 'center'),
                                             fontSize: '0.9rem',
                                             color: '#fff'
                                        }}>Để có thể giải đáp thắc mắc hoặc tư vấn bạn có thể gửi mail về cho chúng tôi để có thể hỗ trợ bạn nhanh nhất nhé !</Typography>
                                   </Box>
                                  
                              </Box>

                         </Box>



                    </Stack>


                    <Typography
                         sx={{
                              borderTop: '1px sloid #000',
                              color: 'secondary.contrastText',
                              fontFamily: '"Nunito", sans-serif',
                              fontSize: '0.9rem',
                              position: 'relative',
                              ...uiConfigs.style.typoLines(1, 'center')
                         }}
                    >© Design By DHD - 2024</Typography>
               </Paper>

          </Container >
     )
}

export default Footer;
