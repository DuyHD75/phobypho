import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import uiConfigs from '../../configs/ui.config';

const Container = ({ header, children }) => {
     return (
          <Box sx={{
               marginX: "auto",
               color: "text.primary"
          }}>
               <Stack spacing={4}>
                    {header && (
                         <Box sx={{
                              position: "relative",
                              paddingTop: { xs: "20px", md: 0 },
                              maxWidth: "1350px",
                              marginX: "auto",
                              width: "100%"
                         }}>
                              <Typography sx={{
                                   ...uiConfigs.style.typoLines(1, "left"),
                                   fontSize: { xs: '1.8rem', md: '2rem', lg: '3rem' },
                                   fontWeight: 800,
                                   position: 'relative',
                                   "::before": {
                                        position: 'absolute',
                                        content: '""',
                                        width: '2rem',
                                        height: '2px',
                                        borderRadius: '10px',
                                        bgcolor: "#C48F56",
                                        bottom: 0,
                                   }
                              }}>
                                   {header}
                              </Typography>
                         </Box>
                    )}
                    {children}
               </Stack>
          </Box>
     );
};

export default Container;