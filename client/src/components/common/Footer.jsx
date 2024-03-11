import React from 'react'
import { Box, Paper, Stack, Button, Typography, Divider } from '@mui/material';

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
                         backgroundColor: "unset",
                         padding: "2rem",
                         paddingX: "4rem",
                         zIndex: 2
                    }}
               >
                    <Stack
                         alignItems="center"
                         justifyContent="space-between"
                         direction={{
                              sx: "column", md: "row"
                         }}
                         sx={{ height: "max-content" }}
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
                                             color: 'inherit',
                                             fontFamily: "Saira Condensed",
                                             fontSize: '1.1rem',
                                             fontWeight: 400

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
                              fontFamily: "Saira Condensed",
                              fontSize: '1rem',
                              fontWeight: 400,
                              marginTop: '1rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: "center"
                         }}

                    >© Design By DHD - 2024</Typography>
               </Paper>

          </Container >
     )
}

export default Footer;
