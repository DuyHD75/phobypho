import React, { Fragment } from 'react'
import { Box, Toolbar } from '@mui/material';
import { Outlet } from "react-router-dom";
import GlobalLoading from '../common/GlobalLoading';
import Footer from '../common/Footer';
import Topbar from '../common/Topbar';
import AuthModal from '../common/AuthModal';
import ReceiveVouchersModal from '../common/ReceiveVouchersModal';

const MainLayout = () => {
     return (
          <div>
               {/* global loading */}
               <GlobalLoading />
               {/* global loading */}

               {/* login modal */}

               {/*  <AuthModal />*/}
               <AuthModal />

               <ReceiveVouchersModal/>
               {/* login modal */}

               <Box display="flex" minHeight="100vh">
                    {/* header */}
                    <Topbar />
                    {/* header */}

                    {/* main */}
                    <Box
                         component="main"
                         flexGrow={1}
                         overflow="hidden"
                         minHeight="100vh"
                    >
                         <Outlet />
                    </Box>
                    {/* main */}
                    
               </Box>
               {/* footer */}
               <Footer />          
               {/* footer */}
          </div>
     )
}

export default MainLayout
