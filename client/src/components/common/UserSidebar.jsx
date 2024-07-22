import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import menuConfigs from '../../configs/menu.config';
import uiConfigs from '../../configs/ui.config';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleLine } from "react-icons/ri";
import { setUser } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import userApi from '../../api/modules/user.api';


const UserSidebar = ({ children }) => {
   const { user } = useSelector(state => state.user);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { appState } = useSelector((state) => state.appState);

   const logout = async() => {
      const { response, err } = await userApi.logout();
      dispatch(setUser(null));
      navigate('/');
   }

   return (
      <Box sx={{ ...uiConfigs.style.mainContent, paddingTop: '5rem', marginTop: '5rem' }}>
         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{
               width: '20%',
               minWidth: '200px',
               borderRadius: '1rem',
               height: 'fit-content',
               boxShadow: '0 0 10px rgba(0,0,0,0.4)',
               position: 'sticky',
               display: { sx: 'none', md: 'block' },
               padding: '2rem 1rem',
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
                                    textTransform: 'normal',
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
                                 <Typography variant="p" sx={{
                                    ...uiConfigs.style.typoLines(1, 'center'),
                                    fontSize: '1rem',
                                    textTransform: 'none',

                                 }}>{item.display}</Typography>
                              </Button>
                           )
                        } else {
                           if (user && item.role === user.userData.account.role) {

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
                                       textTransform: 'none',
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
                           textTransform: 'none',
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
                        <Box sx={{ marginRight: '1rem', }}><RiLogoutCircleLine style={{ fontSize: '1rem' }} /></Box>
                        <Typography variant="p" sx={{
                           ...uiConfigs.style.typoLines(1, 'center'),
                           fontSize: '1rem',
                           textTransform: 'none',

                        }}>{"Đăng xuất"}</Typography>
                     </Button>
                  </Box>
               </Box>
               <Box
                  sx={{
                     width: '100%',
                     height: '200px',
                     backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/icons%2Fundraw_content_re_33px.svg?alt=media&token=9db87cf2-4402-4e12-ba35-ca5c8c2c0b90)',
                     objectFit: 'center',
                     backgroundSize: '75%',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat',
                  }}

               ></Box>
            </Box>
            <Box sx={{ width: { sx: '100%', md: '80%' }, minWidth: '200px', margin: { sx: '0', md: '0 2rem' } }}>
               {children}
            </Box>
         </Box>
      </Box>
   )
}

export default UserSidebar
