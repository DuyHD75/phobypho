import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { Modal, Box } from '@mui/material';
import Logo from './Logo';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';



const actionState = {
     login: 'login',
     signup: 'signup'
}

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
     maxWidth: '500px', 
     maxHeight: '90vh',
     overflowY: 'scroll',
     
};


const AuthModal = () => {

     const { authModalOpen } = useSelector((state) => state.authModal);

     const dispatch = useDispatch();

     const [action, setAction] = useState(actionState);

     const switchAuthState = (state) => setAction(state);

     useEffect(() => {
          if (authModalOpen) setAction(actionState.login);
     }, [authModalOpen]);


     const handleCloseModal = () => dispatch(setAuthModalOpen(false));

     return (
          <Modal
               open={authModalOpen}
               onClose={handleCloseModal}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
              
          >
               <Box sx={style}>
                    <Box >
                         <Box sx={{
                              textAlign: 'center', marginBottom: "1rem",
                              display: 'flex', alignItems: "center",
                              justifyContent: 'center'

                         }}>
                              <Logo />
                         </Box>
                         {action === actionState.login && <LoginModal switchAuthState={() => switchAuthState(actionState.signup)} />}
                         {action === actionState.signup && <SignUpModal switchAuthState={() => switchAuthState(actionState.login)} />}
                    </Box>
               </Box>
          </Modal>
     )
}

export default AuthModal;
