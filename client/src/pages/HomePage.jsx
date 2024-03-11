import React, { Fragment } from 'react'

import HeroSlide from '../components/common/HeroSlide';
import Socialbar from '../components/common/Socialbar';
import HeroGrid from '../components/common/HeroGrid';
import uiConfigs from '../configs/ui.config';
import { Box } from '@mui/material'
import Container from '../components/common/Container';
import PhotographerSlide from '../components/common/PhotographerSlide';

const HomePage = () => {
     return (
          <Fragment>
               <Socialbar />
               <HeroSlide></HeroSlide>
               <Box marginTop="-3rem" sx={{ ...uiConfigs.style.mainContent }}>
                    <Container>
                         <HeroGrid></HeroGrid>
                    </Container>

               </Box>
               <Box paddingTop="3rem" >
                    <PhotographerSlide />
               </Box>


          </Fragment>
     )
}

export default HomePage;



