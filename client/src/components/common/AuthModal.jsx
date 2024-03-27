import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { Modal, Box, Typography } from '@mui/material';
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
     bgcolor: 'background.paper',
     border: '2px solid #000',
     boxShadow: 24,
     p: 4,
     maxWidth: '500px'
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
                    <Box sx={{
                         padding: 4,
                         backgroundColor: "background.paper"
                    }}>
                         <Box sx={{
                              textAlign: 'center', marginBottom: "2rem",
                              display: 'flex', alignItems: "center", justifyContent: 'center'

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
