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
                         height: '100vh',
                         marginTop: '90px',
                         zIndex: isLoading ? 999 : 0
                    }}
               >
                    <LinearProgress />
                    <Box
                         sx={{
                              position: "absolute",
                              top: '50%',
                              left: '50%',
                              transform: "translate(-50%, -50%)"
                         }}
                    >
                         <Logo />
                    </Box>


               </Paper>
          </div>
     )
}

export default GlobalLoading;
