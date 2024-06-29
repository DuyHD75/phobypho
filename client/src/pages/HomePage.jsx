import React, { Fragment, useEffect } from 'react'

import HeroSlide from '../components/common/HeroSlide';
import SocialBar from '../components/common/Socialbar';
import HeroGrid from '../components/common/HeroGrid';
import uiConfigs from '../configs/ui.config';
import { Box, Typography } from '@mui/material'
import Container from '../components/common/Container';
import PhotographerSlide from '../components/common/PhotographerSlide';

const HomePage = () => {
     return (
          <Fragment>
               <SocialBar />
               <HeroSlide></HeroSlide>
               <Box>
                    <Box sx={{ ...uiConfigs.style.mainContent, padding: '4rem' }}>
                         <Container>
                              <HeroGrid></HeroGrid>
                         </Container>
                    </Box>
               </Box>
               <Typography
                    sx={{
                         fontFamily: '"Nunito", sans-serif',
                         position: 'relative',
                         fontWeight: '800',
                         textTransform: 'uppercase',
                         paddingRight: '10px',
                         color: 'secondary.main',
                         margin: '2rem',
                         fontSize: { xs: '1rem', md: '2rem' },
                         "&::before": {
                              content: "''",
                              position: 'absolute',
                              left: '38%',
                              bottom: 0,
                              width: "10rem",
                              height: "2px",
                              background: 'primary.main'
                         }
                    }}
                    textAlign={"center"}
               >
                    Hot Combo
               </Typography>

               <Box >
                    <PhotographerSlide />
               </Box>
          </Fragment>
     )
}

export default HomePage;



