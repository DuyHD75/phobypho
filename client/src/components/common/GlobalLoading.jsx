import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Paper, Box, LinearProgress, Toolbar } from '@mui/material'

import Logo from './Logo';

const GlobalLoading = () => {

     const { globalLoading } = useSelector((state) => state.globalLoading);

     const [isLoading, setIsLoading] = useState(false);

     useEffect(() => {
          if (globalLoading) {
               setIsLoading(true);
          } else {
               setTimeout(() => {
                    setIsLoading(false);
               }, 1000)
          }
     }, [globalLoading])

     return (
          <div>
               <Paper
                    sx={{
                         opacity: isLoading ? 1 : 0,
                         pointerEvent: "none",
                         transition: "all .3s ease-in",
                         position: 'fixed',
                         width: '100vw',
                         backgroundColor: '#f5f7fa',
                         backgroundImage: `url(https://us-wn-g.gr-cdn.com/_next/static/media/bg3.d94446d2.svg), url(https://us-wn-g.gr-cdn.com/_next/static/media/bg1.0d1d3b37.svg), url(https://us-wn-g.gr-cdn.com/_next/static/media/bg2.ad4bd4bc.svg)`,
                         backgroundPosition: 'calc(50% - 418px) -30px, calc(50% - 357px) -370px, calc(50% + 570px) -170px', 
                         backgroundSize: '1742px 1742px,1210px 1210px,1665px 1665px',
                         height: '100vh',
                         marginTop: '90px',
                         zIndex: isLoading ? 10000 : 0, 
                         display: isLoading ? 'block' : 'none'
                    }}
               >
                    <LinearProgress />
                    <Box
                         sx={{
                              position: "absolute",
                              top: '50%',
                              left: '50%',
                              transform: "translate(-50%, -50%)",
                              
                         }}
                    >
                         <Logo />
                    </Box>


               </Paper>
          </div>
     )
}

export default GlobalLoading;
