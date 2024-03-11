import { Box, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import menuConfigs from '../../configs/menu.config';
import { Link } from 'react-router-dom';
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
                              sx={{ cursor: "pointer", useSelector: "none" }}
                              onClick={toggleMenu}

                         >
                              {user.displayName}
                         </Typography>

                         <Menu
                              open={Boolean(anchorEl)}
                              anchorEl={anchorEl}
                              onClick={() => setAnchorEl(null)}
                              PaperProps={{ sx: { padding: 0 } }}
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
                                                  <Typography textTransform={'uppercase'}
                                                       fontFamily={"Saira Condensed"}
                                                       fontSize={'1.6rem'}
                                                  >{item.display}</Typography>
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
