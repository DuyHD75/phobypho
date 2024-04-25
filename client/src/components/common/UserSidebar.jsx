import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import menuConfigs from '../../configs/menu.config';
import uiConfigs from '../../configs/ui.config';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleLine } from "react-icons/ri";
import { setUser } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const UserSidebar = ({ children }) => {
   const { user } = useSelector(state => state.user);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { appState } = useSelector((state) => state.appState);

   const logout = () => {
      dispatch(setUser(null));
      navigate('/');
   }

   return (
      <Box sx={{ ...uiConfigs.style.mainContent, paddingTop: '5rem', marginTop: '5rem' }}>
         <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
               <Box sx={{
                  width: '25%',
                  minWidth: '200px',
                  padding: '2rem 0',
                  borderRadius: '1rem',
                  height: 'fit-content',
                  boxShadow: '0 0 10px rgba(0,0,0,0.4)',
                  position: 'sticky',
                  display: { sx: 'none', md: 'block' },
                  padding: '10px'

               }} >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {menuConfigs.user.map((item, index) => {
                           if (!item.role) {
                              return (
                                 <Button
                                    component={Link}
                                    to={item.path}
                                    key={index}
                                    sx={{
                                       mr: 2,
                                       fontFamily: '"Nunito", sans-serif',
                                       fontSize: "0.9rem",
                                       fontWeight: "600",
                                       color: 'secondary.contrastText',
                                       textTransform: 'capitalize',
                                       display: 'flex',
                                       alignItems: 'center',
                                       flexDirection: 'row',
                                       justifyContent: 'flex-start',
                                       color: 'secondary.colorText',
                                       padding: '0.6rem 10px',
                                       width: '100%',
                                       bgcolor: appState.includes(item.state) ? 'primary.main' : 'transparent',
                                       '&:hover': {
                                          color: 'secondary.colorText',
                                          bgColor: 'rgba(0,0,0,0.5)',
                                       }
                                    }}
                                 >
                                    <Box sx={{ marginRight: '1rem', }}>  {item.icon}</Box>
                                    <Typography variant="p">{item.display}</Typography>
                                 </Button>
                              )
                           } else {
                              if (user && item.role === user.role) {

                                 return (
                                    <Button
                                       component={Link}
                                       to={item.path}
                                       key={index}
                                       sx={{
                                          mr: 2,
                                          fontFamily: '"Nunito", sans-serif',
                                          fontSize: "0.9rem",
                                          fontWeight: "600",
                                          color: 'secondary.contrastText',
                                          textTransform: 'capitalize',
                                          display: 'flex',
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'flex-start',
                                          color: 'secondary.colorText',
                                          padding: '0.6rem 10px',
                                          width: '100%',
                                          bgcolor: appState.includes(item.state) ? 'primary.main' : 'transparent',
                                          '&:hover': {
                                             color: 'secondary.colorText',
                                             bgColor: 'rgba(0,0,0,0.5)',
                                          }
                                       }}
                                    >
                                       <Box sx={{ marginRight: '1rem', }}>  {item.icon}</Box>
                                       <Typography variant="p">{item.display}</Typography>
                                    </Button>
                                 )
                              }
                           }
                        })}

                        <Button
                           onClick={logout}
                           sx={{
                              mr: 2,
                              fontFamily: '"Nunito", sans-serif',
                              fontSize: "0.9rem",
                              fontWeight: "600",
                              color: 'secondary.contrastText',
                              textTransform: 'capitalize',
                              display: 'flex',
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              color: 'secondary.colorText',
                              padding: '0.6rem 10px',
                              width: '100%',
                              '&:hover': {
                                 color: 'secondary.colorText',
                                 bgColor: 'rgba(0,0,0,0.5)',
                              }
                           }}
                        >
                           <Box sx={{ marginRight: '1rem', }}><RiLogoutCircleLine style={{ fontSize: '1.3rem' }} /></Box>
                           <Typography variant="p">{"Logout"}</Typography>
                        </Button>
                     </Box>
                  </Box>
               </Box>
               <Box sx={{ width: { sx: '100%', md: '75%' }, minWidth: '200px', margin: { sx: '0', md: '0 2rem' } }}>
                  {children}
               </Box>
            </Box>
         </Container>
      </Box>
   )
}

export default UserSidebar
