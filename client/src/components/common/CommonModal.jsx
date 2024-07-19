import React from 'react'
import { Modal, Box } from '@mui/material'



const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '100%',
   backgroundColor: '#f5f7fa',
   backgroundImage: `url(https://us-wn-g.gr-cdn.com/_next/static/media/bg3.d94446d2.svg), url(https://us-wn-g.gr-cdn.com/_next/static/media/bg1.0d1d3b37.svg), url(https://us-wn-g.gr-cdn.com/_next/static/media/bg2.ad4bd4bc.svg)`,
   backgroundPosition: 'calc(50% - 418px) -30px, calc(50% - 357px) -370px, calc(50% + 570px) -170px',
   backgroundSize: '1742px 1742px,1210px 1210px,1665px 1665px',
   color: 'secondary.colorText',
   boxShadow: 24,
   p: 4,
   maxWidth: '600px',
   minHeight: '364px',
};

const CommonModal = ({ children, ...args }) => {
   return (
      <Modal
         open={args.open}
         onClose={() => args.onClose(false)}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={ style }>

            {children}

         </Box>
      </Modal>
   )
}

export default CommonModal
