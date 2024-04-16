import { Box, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import menuConfigs from '../../configs/menu.config';
import { Link } from 'react-router-dom';

import uiConfigs from '../../configs/ui.config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlineIcon from '@mui/icons-material/LogoutOutlined';
import { setUser } from '../../redux/features/userSlice';

const UserMenu = () => {

     const { user } = useSelector((state) => state.user);
     const dispatch = useDispatch();
     const [anchorEl, setAnchorEl] = useState(false);
     const toggleMenu = (e) => setAnchorEl(true)
     return (
          <div>
               {user && (
                    <Box>
                         <Typography
                              variant='h6'
                              sx={{
                                   cursor: "pointer",
                                   useSelector: "none",
                                   display: "flex",
                                   alignItems: "center",
                              }}
                              onClick={toggleMenu}
                         >
                              <AccountCircleIcon />
                              {user.displayName}
                         </Typography>

                         <Menu
                              open={Boolean(anchorEl)}
                              anchorEl={anchorEl}
                              onClick={() => setAnchorEl(null)}
                              PaperProps={{ sx: { padding: 0, top: 0, left: 0 } }}
                         >
                              {menuConfigs.user.map((item, index) => (
                                   <ListItemButton
                                        key={index}
                                        component={Link}
                                        to={item.path}
                                        onClick={() => setAnchorEl(null)}
                                   >

                                        <ListItemIcon color='red'>{item.icon}</ListItemIcon>

                                        <ListItemText disableTypography primary={
                                             <Typography
                                                  textTransform="uppercase"
                                                  sx={{ fontSize: "0.9rem", color: 'secondary.colorText', ...uiConfigs.style.typoLines(1, 'left') }}
                                             >
                                                  {item.display}
                                             </Typography>
                                        } />

                                   </ListItemButton>
                              ))}

                              <ListItemButton
                                   sx={{ borderRadius: '10px' }}
                                   onClick={() => dispatch(setUser(null))}
                              >
                                   <ListItemIcon>
                                        <LogoutOutlineIcon color='secondary.main' />
                                   </ListItemIcon>

                                   <ListItemText
                                        disableTypography
                                        primary={
                                             <Typography textTransform="uppercase"
                                                  sx={{ fontSize: "0.9rem", color: 'secondary.colorText', ...uiConfigs.style.typoLines(1, 'left') }}

                                             >Logout</Typography>
                                        }
                                   />
                              </ListItemButton>
                         </Menu>
                    </Box>
               )}
          </div>
     )
}

export default UserMenu
