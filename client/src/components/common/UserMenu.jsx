import { Box, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import menuConfigs from '../../configs/menu.config';
import { Link } from 'react-router-dom';

import uiConfigs from '../../configs/ui.config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserMenu = () => {

     const { user } = useSelector((state) => state.user);
     const dispatch = useDispatch();
     const [anchorEl, setAnchorEl] = useState(false);
     const toggleMenu = (e) => setAnchorEl(true)
     return (
          <div>
               {user && (
                    <Box>

                         <Box
                              sx={{
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'space-around'
                              }}

                         >
                              <AccountCircleIcon sx={{
                                   fontSize: '2rem', marginRight: '0.5rem'
                              }} />

                              <Typography
                                   variant='h6'
                                   sx={{
                                        cursor: "pointer",
                                        useSelector: "none",
                                        fontSize: '1.3rem',
                                        ...uiConfigs.style.typoLines(1, 'center')
                                   }}
                                   onClick={toggleMenu}

                              >
                                   {user.displayName}
                              </Typography>

                         </Box>


                         <Menu
                              open={Boolean(anchorEl)}
                              anchorEl={anchorEl}
                              onClick={() => setAnchorEl(null)}
                              PaperProps={{ sx: { padding: 0 } }}
                              className='menu_user'
                         >

                              {menuConfigs.user.map((item, index) => (
                                   <ListItemButton
                                        key={index}
                                        component={Link}
                                        to={item.path}
                                        onClick={() => setAnchorEl(null)}

                                   >

                                        <ListItemIcon>{item.icon}</ListItemIcon>


                                        <ListItemText
                                             disableTypography
                                             primary={
                                                  <Typography
                                                       textTransform={'uppercase'}
                                                       fontFamily={"Saira Condensed"}
                                                       fontSize={'1.2rem'}
                                                  >
                                                       {item.display}
                                                  </Typography>
                                             }
                                        >{item.display}</ListItemText>
                                   </ListItemButton>


                              ))}
                         </Menu>

                    </Box>
               )}

          </div>
     )
}

export default UserMenu
