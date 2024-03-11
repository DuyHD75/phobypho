import React, { Fragment, useState } from 'react'
import { Box, Stack, Typography, TextField, Avatar } from '@mui/material';
import Container from './Container';
import uiConfigs from '../../configs/ui.config';
import { LoadingButton } from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useSelector } from 'react-redux';
import reviewApi from '../../api/modules/review.api';
import { toast } from 'react-toastify'
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";


const PhotoReviewItem = ({ review, onRemoved }) => {
     // const { user } = useSelector((state) => state.user);

     const [onRequest, setOnRequest] = useState(false);

     const onRemove = async () => {
          if (onRequest) return;

          setOnRequest(true);

          const { response, err } = await reviewApi.remove({ reviewId: review.id });

          if (err) toast.error(err.message);

          if (response) onRemoved(review.id);
     }

     return (
          <Box sx={{
               padding: 2,
               borderRadius: "5px",
               position: "relative",
               opacity: onRequest ? 0.6 : 1,
               "&:hover": { backgroundColor: "background.paper" }
          }}>
               <Stack direction="row" spacing={2}>
                    {/* avatar */}

                    <Avatar
                         variant="rounded"
                         sx={{ width: 60, height: 60 }}
                         src='https://plus.unsplash.com/premium_photo-1673264933048-3bd3f5b86f9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8fDA%3D'

                    />
                    {'review.user' && <Box></Box>}
                    {/* avatar */}
                    <Stack spacing={2} flexGrow={1}>

                         <Stack spacing={1}>
                              <Typography variant="h6" fontWeight="700" sx={{
                                   ...uiConfigs.style.typoLines(1, 'left'), 
                                   borderBottom: '0.6px solid '
                              }}>
                                   {'review.user.displayName'}
                              </Typography>
                              <Typography variant="caption" sx={{
                                   fontFamily: "Saira Condensed",
                                   color: '#C48F56',
                                   fontSize: '1rem'
                              }}>
                                   23-03-2024
                                   {/*dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")*/}
                              </Typography>
                         </Stack>

                         <Typography variant="body1" textAlign="justify" sx={{ ...uiConfigs.style.typoLines(1, 'left') }}>
                              {'review.content'}
                         </Typography>
                         {/*user && user.id === review.user.id && (
                              <LoadingButton
                                   variant="contained"
                                   startIcon={<DeleteIcon />}
                                   loadingPosition="start"
                                   loading={onRequest}
                                   onClick={onRemove}
                                   sx={{
                                        position: { xs: "relative", md: "absolute" },
                                        right: { xs: 0, md: "10px" },
                                        marginTop: { xs: 2, md: 0 },
                                        width: "max-content"
                                   }}
                              >
                                   remove
                              </LoadingButton>
                              )*/}
                    </Stack>
               </Stack>
          </Box>
     );

}

const PhotoReview = () => {
     const [content, setContent] = useState("");

     const [onRequest, setOnRequest] = useState(false);


     const addComment = () => {
          setOnRequest(true);
          console.log(content);
     }
     return (
          <Fragment>

               <Container header={'Comments'}>
                    <PhotoReviewItem />
               </Container>

               <Container header={'Leave a comment'}>
                    <Box>
                         <TextField
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              multiline
                              rows={4}
                              fullWidth
                              sx={{
                                   border: '1px solid #fff',
                                   outline: 'none',
                                   ...uiConfigs.style.typoLines(1, 'left'),
                                   '&:focus': {
                                        borderColor: '#C48F56',
                                   }
                              }}
                              placeholder="Enter your comment..."
                         />


                         <LoadingButton
                              variant="text"
                              size="medium"
                              sx={{
                                   width: "max-content",
                                   border: '1px solid #C48F56',
                                   color: '#fff',
                                   marginTop: '2rem',
                                   padding: '0.6rem 1rem',
                                   ...uiConfigs.style.typoLines(1, 'left'),
                                   display: 'flex',
                                   alignItems: "center",
                                   fontSize: '1rem'

                              }}
                              startIcon={<SendOutlinedIcon />}
                              loadingPosition="start"
                              loading={onRequest}
                              onClick={addComment}

                         >
                              SEND
                         </LoadingButton>
                    </Box>

               </Container>

          </Fragment>
     );
};

export default PhotoReview;
