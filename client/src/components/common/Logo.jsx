import React from 'react'
import { Typography } from '@mui/material'
import CameraIcon from '@mui/icons-material/Camera';
import uiConfigs from '../../configs/ui.config';


const Logo = ({ isHeader }) => {
     return (
          isHeader ? (<Typography
               sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: 'space-between'
               }}
          >
               <CameraIcon sx={{
                    color: 'inherit', fontSize: '2rem',
                    textShadow: '1px 2px 2px #000',
                    border: '1px dashed #000',
                    borderRadius: '50%'
               }} />

               <span style={{
                    color: 'text.secondary',
                    fontSize: '1.3rem',
                    lineHeight: '2rem',
                    fontWeight: 800,
                    textShadow: '1px 1px 1px #000',
               }}>
                    PHOBYPHO
               </span>

          </Typography>) : (
               <Typography
                    sx={{
                         display: 'flex',
                         alignItems: "center",
                         color: 'secondary.colorText',
                    }}
               >
                    <CameraIcon sx={{ color: 'secondary.colorText', fontSize: { xs: '1rem', md: '2rem' } }} />

                    <span style={{
                         color: 'secondary.colorText',
                         fontSize: '1.2rem',
                         fontWeight: 800,
                         ...uiConfigs.style.typoLines(1, 'center'),
                    }}>
                         PHOBYPHO
                    </span>

               </Typography>
          )

     );
};

export default Logo;
