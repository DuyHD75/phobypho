import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import uiconfig from '../../configs/ui.config'

const NotFound = () => {
   return (
      <Stack flexDirection={"column"} justifyContent={'center'} alignItems={"center"}>
         <Box sx={{
            width: '100%',
            height: '50vh',
            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/icons%2Fundraw_void_-3-ggu.svg?alt=media&token=f577fe77-c187-4d7e-b92b-9f276a4c9d95)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            marginTop: '2rem'
         }} />
         <Typography variant='p' sx={{
            ...uiconfig.style.typoLines(2, 'center'),
            color: 'secondary.colorText',
            marginTop: '2rem'
         }}>Không tìm thấy kết quả nào!</Typography>
      </Stack>

   )
}

export default NotFound
