import React, { Fragment } from 'react'

import HeroSlide from '../components/common/HeroSlide';
import SocialBar from '../components/common/SocialBar';
import HeroGrid from '../components/common/HeroGrid';
import uiConfigs from '../configs/ui.config';
import { Box } from '@mui/material'
import Container from '../components/common/Container';
import PhotographerSlide from '../components/common/PhotographerSlide';

const HomePage = () => {
     return (
          <Fragment>
               <SocialBar />
               <HeroSlide></HeroSlide>


               <Box paddingTop={'3rem'} sx={{ ...uiConfigs.style.mainContent }}>
                    <Container>
                         <HeroGrid></HeroGrid>
                    </Container>
               </Box>

               <Box>
                    <PhotographerSlide />
               </Box>



          </Fragment>
     )
}

export default HomePage;



