import React from 'react'
import { AppBar, Stack, Toolbar, Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import menuConfigs from '../../configs/menu.config'
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Socialbar = () => {
     return (
          <div>
               <List sx={{
                    paddingX: "30px",
                    display: {xs: 'none', md: 'flex'},
                    position: 'absolute',
                    left: {sx: 0, md: '-13rem' , lg:'-10rem'},
                    top: '45%',
                    height: '100px',
                    width: 'max-content',
                    zIndex: 20,
                    rotate: '-90deg',
                    fontSize: '1rem'
               }}>
                    {menuConfigs.social.map((item, index) => (
                         <ListItemButton
                              key={index}
                              component={Link}
                              to={item.path}
                         >
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText
                                   disableTypography
                                   primary={
                                        <Typography
                                             textTransform="uppercase"
                                             fontFamily={"Saira Condensed"}
                                             fontSize={'0.9rem'}
                                             fontWeight={500}
                                        >{item.display}</Typography>}

                              >{item.display}</ListItemText>

                         </ListItemButton>)

                    )}

               </List>
          </div>
     )
}

export default Socialbar
