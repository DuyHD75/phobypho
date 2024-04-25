import React from 'react'
import { Box, Paper, Stack, Button, Typography, Divider } from '@mui/material';
import uiConfigs from '../../configs/ui.config';
import Logo from './Logo';
import menuConfigs from '../../configs/menu.config';
import { Link } from 'react-router-dom';
import Container from './Container';



const Footer = () => {
     return (
          <Container>
               <Paper
                    square={true}
                    sx={{
                         backgroundColor: "secondary.main",
                         padding: "2rem",
                         paddingX: "4rem",
                    }}
               >
                    <Stack
                         alignItems="center"
                         justifyContent="space-between"
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
                                             color: 'secondary.colorText',
                                             fontFamily: '"Nunito", sans-serif',
                                             fontSize: '0.9rem',
                                        }}
                                        component={Link}
                                        to={item.path}
                                   >
                                        {item.display}
                                   </Button>
                              ))}
                         </Box>


                    </Stack>

                    <Typography
                         sx={{
                              color: 'inherit',
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
