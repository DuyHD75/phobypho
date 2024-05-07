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
                         sx={{
                              ...uiConfigs.style.typoLines(1, 'left'),
                              fontWeight: 700,
                         }}
                         variant='h6' marginBottom="20px"
                         fontFamily={"Saira Condensed"}
                         fontSize={'1.4rem'}

                    >MENU</Typography>

                    {menuConfigs.main.map((item, index) => (
                         <ListItemButton
                              variant="contained"
                              key={index}
                              sx={{
                                   borderRadius: "10px",
                                   marginY: 1,
                                   backgroundColor: appState.includes(item.state) ? "primary.main" : "unset",
                                   color: appState.includes(item.state) ? "primary.contrastText" : "secondary.colorText"
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
                                             textTransform="capitalize"
                                             fontFamily={"Saira Condensed"}
                                             fontSize={'1rem'}
                                             fontWeight={500}
                                             sx={{ ...uiConfigs.style.typoLines(1, 'left') }}
                                        >{item.display}</Typography>}
                              />
                         </ListItemButton>
                    ))}
                    {user && (
                         <div>
                              <Typography variant='h6' marginBottom="20px" sx={{
                                   ...uiConfigs.style.typoLines(1, 'left')
                                   , fontWeight: 700,

                              }}>PERSONAL</Typography>

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
                                             primary={
                                                  <Typography
                                                       fontSize={'1rem'}
                                                       sx={{ ...uiConfigs.style.typoLines(1, 'left') }}
                                                       textTransform="capitalize"
                                                       color={appState.includes(item.state) ? "primary.contrastText" : "secondary.colorText"}
                                                  >{item.display}</Typography>
                                             }
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
