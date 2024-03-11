import React, { useState, cloneElement } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from '@mui/material';
import menuConfigs from "../../configs/menu.config";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";


const ScrollAppBar = ({ children, window }) => {

     const trigger = useScrollTrigger({
          disableHysteresis: true,
          threshold: 50,
          target: window ? window() : undefined
     })

     return cloneElement(children, {
          sx: {
               color: trigger ? "text.primary" : 'primary.contrastText',
               backgroundColor: trigger ? "background.paper" : "transparent"
          }
     })
}


const Topbar = () => {

     const { user } = useSelector((state) => state.user);
     const { appState } = useSelector((state) => state.appState);


     const [openSideBar, setOpenSideBar] = useState(false);

     const dispatch = useDispatch();

     const toggleSidebar = () => {
          setOpenSideBar(!openSideBar);
     };


     return (
          <Box>
               <SideBar open={openSideBar} toggleSideBar={toggleSidebar} />

               <ScrollAppBar>
                    <AppBar
                         elevation={0}
                         sx={{ zIndex: 999 }}

                    >
                         <Toolbar
                              sx={{
                                   alignItems: "center",
                                   justifyContent: "space-between",
                                   maxWidth: '1350px',
                                   marginX: "auto",
                                   width: "100%",
                                   paddingY: '1.6rem'
                              }}
                         >
                              <Stack
                                   direction={"row"}
                                   spacing={1}
                                   alignItems={"center"}
                                   justifyContent={'space-around'}
                              >
                                   <IconButton
                                        color="inherit"
                                        sx={{ mr: 2, display: { md: "none" } }}
                                        onClick={toggleSidebar}
                                   >
                                        <MenuIcon></MenuIcon>
                                   </IconButton>
                                   <Box
                                        sx={{
                                             display: { xs: 'inline-block', md: "none" },
                                             position: "relative",
                                             left: { sm: '40%', sx: '40%' }
                                        }}
                                   >
                                        <Logo isHeader={true} />
                                   </Box>
                              </Stack>

                              {/*main menu */}
                              <Box sx={{ marginRight: '30px', display: {xs: 'none', md: 'block'} }}>
                                   <Logo isHeader={true} />
                              </Box>

                              <Box
                                   flexGrow={1} alignItems="center"
                                   display={{ xs: "none", md: "flex" }}
                                   justifyContent={'space-around'}
                              >

                                   <Box  >
                                        {menuConfigs.main.map((item, index) => (
                                             <Button
                                                  component={Link}
                                                  to={item.path}
                                                  key={index}
                                                  variant={appState.includes(item.state) ? "outline" : "text"}
                                                  sx={{
                                                       mr: 2,
                                                       fontFamily: "Saira Condensed",
                                                       fontSize: '1.04rem',
                                                       fontWeight: '500',
                                                       color: appState.includes(item.state) ? "#C48F56" : "inherit",
                                                  }}

                                             >{item.display}
                                             </Button>
                                        ))}
                                   </Box>
                              </Box>

                              {/*main menu */}

                              <Stack
                                   spacing={3} direction="row" alignItems="center"
                              >
                                   {!user && <Button
                                        variant='contained'
                                        sx={{
                                             fontFamily: "Saira Condensed",
                                             fontSize: '1rem',
                                             fontWeight: '500',
                                        }}
                                        onClick={() => dispatch(setAuthModalOpen(true))}
                                   >
                                        Login
                                   </Button>}
                              </Stack>


                         </Toolbar>

                    </AppBar>

               </ScrollAppBar>

          </Box>
     );
}


export default Topbar;