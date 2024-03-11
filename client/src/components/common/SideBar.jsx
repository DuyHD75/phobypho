import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uiConfigs from '../../configs/ui.config';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material'
import Logo from './Logo';
import { Link } from 'react-router-dom';
import menuConfigs from '../../configs/menu.config';



const SideBar = ({ open, toggleSideBar }) => {

     const dispatch = useDispatch();

     const { user } = useSelector((state) => state.user);
     const { appState } = useSelector((state) => state.appState);

     const sideBarWidth = uiConfigs.size.sideBarWidth;



     const drawer = (
          <div>
               <Toolbar
                    sx={{ paddingY: "20px", color: 'text.primary', marginTop: '.8rem' }}
               >
                    <Stack
                         width="100%" direction={"row"} justifyContent={'center'}
                    >
                         <Logo />
                    </Stack>
               </Toolbar>
               <List
                    sx={{ paddingX: "30px" }}
               >
                    <Typography
                         variant='h6' marginBottom="20px"
                         fontFamily={"Saira Condensed"}
                         fontSize={'1.4rem'}
                    >MENU</Typography>

                    {menuConfigs.main.map((item, index) => (
                         <ListItemButton
                              key={index}
                              sx={{
                                   borderRadius: "10px",
                                   marginY: 1,
                                   backgroundColor: appState.includes(item.state) ? "primary.main" : "unset"
                              }}
                              component={Link}
                              to={item.path}
                              onClick={() => toggleSideBar(false)}
                         >
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText
                                   disableTypography
                                   primary={
                                        <Typography
                                             textTransform="uppercase"
                                             fontFamily={"Saira Condensed"}
                                             fontSize={'1.2rem'}
                                             fontWeight={500}
                                        >{item.display}</Typography>}
                              />
                         </ListItemButton>
                    ))}
                    {user && (
                         <div>
                              <Typography variant='h6' marginBottom="20px">PERSONAL</Typography>

                              {menuConfigs.user.map((item, index) => (
                                   <ListItemButton
                                        key={index}
                                        sx={{
                                             borderRadius: "10px",
                                             marginY: 1,
                                             backgroundColor: appState.includes(item.state) ? "primary.main" : "unset"
                                        }}
                                        component={Link}
                                        to={item.path}
                                        onClick={() => toggleSideBar(false)}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText
                                             disableTypography
                                             primary={<Typography
                                                  textTransform="uppercase"
                                             >{item.display}</Typography>}
                                        />
                                   </ListItemButton>
                              ))}
                         </div>
                    )}

               </List>
          </div>
     )


     return (
          <Drawer
               open={open}
               onClose={() => toggleSideBar(false)}
               sx={{
                    "& .MuiDrawer_Paper": {
                         boxSizing: "border-box",
                         width: sideBarWidth,
                         borderRight: "0px"
                    }
               }}
          >
               {drawer}
          </Drawer>
     )
}

export default SideBar;


// <Typography variant='h6' marginBottom="20px"  >THEME</Typography>
// <ListItemButton onClick={onSwitchTheme}>
//      <ListItemIcon>
//           {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
//           {themeMode === themeModes.light && <WbSunnyOutlineIcon />}
//      </ListItemIcon>
//      <ListItemText
//           disableTypography
//           primary={
//                <Typography textTransform="uppercase">{themeMode === themeModes.dark ? "Dark Mode" : "Light Mode"}</Typography>
//           }
//      />
// </ListItemButton>
