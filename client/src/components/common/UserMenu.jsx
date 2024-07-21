import { Box, Button, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import menuConfigs from '../../configs/menu.config';
import { Link } from 'react-router-dom';

import uiConfigs from '../../configs/ui.config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlineIcon from '@mui/icons-material/LogoutOutlined';
import { setUser } from '../../redux/features/userSlice';
import { FaUser } from "react-icons/fa";
import { setAppState } from '../../redux/features/appStateSlice';

const UserMenu = () => {

     const { user } = useSelector((state) => state.user);
     const dispatch = useDispatch();
     const [anchorEl, setAnchorEl] = useState(false);
     const toggleMenu = (e) => setAnchorEl(true)

     return (
          <div>
               {user && (
                    <Box sx={{ position: 'relative' }}>
                         <Button
                              component={Link}
                              to={'/profile'}
                              sx={{
                                   mr: 2,
                                   fontFamily: '"Nunito", sans-serif',
                                   fontSize: "0.9rem",
                                   fontWeight: "600",
                                   display: "flex",
                                   alignItems: "center",
                              }}
                         >
                              {user.userData.account.avatar ? (
                                   <img
                                        src={user.userData.account.avatar}
                                        alt={user.userData.account.displayName}
                                        style={{
                                             width: '1.8rem',
                                             height: '1.8rem',
                                             borderRadius: '10px',
                                             objectFit: 'cover',
                                        }}
                                   />

                              ) : <FaUser style={{ fontSize: '1.2rem' }} />}
                              <Typography sx={{
                                   ml: { sx: '0', md: 1 }, ...uiConfigs.style.typoLines(1, 'center'),
                                   textTransform: 'capitalize', color: 'primary.main'
                              }}>{user.userData.account.displayName}</Typography>
                         </Button>
                    </Box>
               )}
          </div>
     )
}

export default UserMenu;
