import React, { Fragment, useState, useEffect } from 'react'
import { Box, Stack, Typography, TextField, Avatar, Divider, Button, Rating } from '@mui/material';
import Container from './Container';
import uiConfigs from '../../configs/ui.config';
import { LoadingButton } from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useSelector } from 'react-redux';
import reviewApi from '../../api/modules/review.api';
import { toast } from 'react-toastify'
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from 'moment'


const PhotoReviewItem = ({ review, onRemoved }) => {
     const { user } = useSelector((state) => state.user);

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

                    {/* avatar */}
                    <Stack spacing={2} flexGrow={1} >
                         <Stack spacing={1}>
                              <Stack
                                   sx={{
                                        borderBottom: '0.6px solid #444'
                                   }}
                              >
                                   <Typography variant="h6" fontWeight="700" sx={{
                                        ...uiConfigs.style.typoLines(1, 'left'),
                                   }}>
                                        {review.account.username}

                                   </Typography>
                                   {user && user.id === review.account.id && (
                                        <LoadingButton
                                             variant="text"
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
                                   )}
                              </Stack>


                              <Typography variant="caption" sx={{
                                   fontFamily: "Saira Condensed",
                                   color: '#C48F56',
                                   fontSize: '1rem'
                              }}>
                                   {moment(review.createdAt).format('dddd, MMMM YYYY  HH:mm')}
                              </Typography>
                         </Stack>

                         <Typography variant="body1" textAlign="justify" sx={{ ...uiConfigs.style.typoLines(3, 'left') }}>
                              {review.content}
                         </Typography>
                    </Stack>
               </Stack>
          </Box>
     );

}

const PhotoReview = ({ photo }) => {

     const { user } = useSelector((state) => state.user);
     const [reviewList, setReviewList] = useState([]);
     const [filteredReview, setFilteredReview] = useState([]);
     const [reviewCount, setReviewCount] = useState(0);
     const [content, setContent] = useState("");
     const [page, setPage] = useState(1);
     const [onRequest, setOnRequest] = useState(false);
     const [rating, setRating] = useState(0)
     const skip = 4;


     useEffect(() => {
          setReviewList([...photo.reviews]);
          setFilteredReview([...photo.reviews].splice(0, 4));
          setReviewCount(photo.reviews.length);
     }, [photo])


     const addComment = async () => {
          setOnRequest(true);
          const body = {
               photo_id: photo.id,
               photo_poster: photo.poster,
               content: content,
               rating: rating
          };

          const { response, err } = await reviewApi.add(body);
          setOnRequest(false);

          if (err) toast.error(err.message);

          if (response) {
               toast.success("Post review successfully!");
               setFilteredReview([...filteredReview, response]);
               setReviewCount(reviewCount + 1)
               setContent("");
               setRating(0);
          }
     };

     const onLoadMoreReview = () => {
          setFilteredReview([...filteredReview,
          ...[filteredReview].splice(page * skip, skip)]);
          setPage(page + 1);
     }

     const onRemoveReview = (id) => {
          if (reviewList.findIndex(e => e.id === id) !== -1) {
               const newListReview = [...reviewList].filter(item => item.id !== id);
               setReviewList(newListReview);
               setFilteredReview([...newListReview].splice(0, page * skip));
          } else {
               setFilteredReview([...filteredReview].filter(e => e.id !== id));
          }
          setReviewCount(reviewCount - 1);
          toast.success("Remove review successfully!");
     }

     return (
          <Fragment>

               {reviewCount > 0 && (
                    <Container header={`Đánh giá (${reviewCount})`} size={'1rem'}>
                         <Stack spacing={4} marginBottom={2}>

                              {filteredReview.map((item) => (
                                   item.account ? <Box key={item.id}>
                                        <PhotoReviewItem review={item} onRemoved={onRemoveReview} />
                                        <Divider sx={{
                                             display: { xs: "block", md: "none" }
                                        }} />
                                   </Box> : null
                              ))}

                              {filteredReview.length < reviewList.length && (
                                   <Button onClick={onLoadMoreReview}>Xem thêm</Button>
                              )}
                         </Stack>
                    </Container>
               )}

               {user && (
                    <Container header={'Gửi lại những đánh giá'} size={'1rem'}>
                         <Box sx={{ padding: '0 1rem' }}>

                              <Stack direction={'row'} alignItems={'center'} padding={'0.5rem 0'} >
                                   <Typography component="legend"
                                        sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             fontSize: { xs: '1rem', md: '1.1rem' },
                                             fontWeight: '500',
                                             marginRight: '10px'
                                        }}

                                   >Bạn đánh giá cho photo này bao nhiêu sao nhỉ  </Typography>
                                   <Rating
                                        name="rating"
                                        value={rating}
                                        size='medium'
                                        style={{ fontSize: 40 }}
                                        onChange={(event, newValue) => {
                                             setRating(newValue);
                                        }}
                                   />
                              </Stack>
                              
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
                                   placeholder="Nhập bình luận của bạn tại đây nhé..."
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
                                   endIcon={<SendOutlinedIcon />}
                                   loadingPosition="start"
                                   loading={onRequest}
                                   onClick={addComment}

                              >
                                   Gửi Đánh Giá
                              </LoadingButton>
                         </Box>

                    </Container>
               )}

          </Fragment>
     );
};

export default PhotoReview;