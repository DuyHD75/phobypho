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

     console.log(review)
     const { user } = useSelector((state) => state.user);
     const [onRequest, setOnRequest] = useState(false);

     const onRemove = async () => {
          if (onRequest) return;

          setOnRequest(true);
          const { response, err } = await reviewApi.remove({ reviewId: review.id });
          setOnRequest(false);
          if (err) toast.error(err.message);
          if (response) onRemoved(review.id);
     }

     return (
          <Fragment>
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
                              sx={{ width: 50, height: 50, borderRadius: "50%" }}
                              src={`${review.account.avatar}`}
                         />
                         {/* avatar */}
                         <Stack spacing={2} flexGrow={1} >
                              <Stack spacing={1}>
                                   <Stack direction="row" justifyContent="space-between" alignItems="center"
                                   >
                                        <Typography variant="h6" fontWeight="700" sx={{
                                             ...uiConfigs.style.typoLines(1, 'left'),
                                             borderBottom: '0.6px solid #444',
                                             width: 'max-content',
                                             textTransform: 'capitalize',
                                             fontSize: '1rem'
                                        }}>
                                             {review.account.username}
                                        </Typography>

                                        {user && user.id === review.account.id && (<LoadingButton
                                             variant="text"
                                             startIcon={<DeleteIcon />}
                                             loadingPosition="start"
                                             loading={onRequest}
                                             onClick={onRemove}
                                             sx={{
                                                  position: { xs: "relative", md: "absolute" },
                                                  right: { xs: 0, md: "10px" },
                                                  marginTop: { xs: 2, md: 0 },
                                                  width: "max-content",
                                                  color: 'red'
                                             }}
                                        >
                                             remove
                                        </LoadingButton>)}

                                   </Stack>


                                   <Typography variant="caption" sx={{
                                        fontFamily: '"Nunito", sans-serif',
                                        color: "secondary.colorText",
                                        fontSize: '0.9rem'

                                   }}>
                                        {moment(review.createdAt).format('DD-MM-YYYY  HH:mm')}
                                   </Typography>
                              </Stack>

                              <Typography variant="body1" textAlign="justify" sx={{ ...uiConfigs.style.typoLines(3, 'left') }}>
                                   {review.content}
                              </Typography>
                         </Stack>
                    </Stack>
               </Box>

          </Fragment>
     );

}

const PhotoReview = ({ photo, bookedInfo }) => {
     console.log(bookedInfo)
     const { user } = useSelector((state) => state.user);
     const [reviewList, setReviewList] = useState([]);
     const [filteredReview, setFilteredReview] = useState([]);
     const [reviewCount, setReviewCount] = useState(0);
     const [content, setContent] = useState("");
     const [page, setPage] = useState(1);
     const [onRequest, setOnRequest] = useState(false);
     const [rating, setRating] = useState(0);
     const [isBooked, setIsBooked] = useState();

     const skip = 4;

     useEffect(() => {
          setReviewList([...photo.reviews]);
          setFilteredReview([...photo.reviews].splice(0, 4));
          setReviewCount(photo.reviews.length);
     }, [photo]);

     useEffect(() => {
          if (bookedInfo.length > 0) {
               checkIsBooked();
          }
     }, [bookedInfo]);


     const checkIsBooked = () => {

          const isPhotoBooked = bookedInfo.filter(booking => { return booking.photo.toString() === photo.id.toString() && booking.status === "COMPLETED" }).length > 0;
          setIsBooked(isPhotoBooked);
     }


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
                         <Box sx={{ padding: '0 1rem', color: "secondary.colorText", }}>

                              {user.role === "CUSTOMER" && isBooked && (
                                   <Fragment>

                                        <Stack direction={'row'} alignItems={'center'} padding={'0.5rem 0'} >
                                             <Typography component="legend"
                                                  sx={{
                                                       ...uiConfigs.style.typoLines(1, 'left'),
                                                       fontSize: { xs: '1rem', md: '1.1rem' },
                                                       fontWeight: '500',
                                                       marginRight: '10px',
                                                       color: "secondary.colorText",
                                                  }}

                                             >Bạn đánh giá cho photographer này bao nhiêu sao nhỉ  </Typography>

                                             <Rating
                                                  style={{ fontSize: '1.5rem' }}
                                                  name="simple-controlled"
                                                  value={rating}
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
                                                  border: '1px solid #000',
                                                  outline: 'none',
                                                  ...uiConfigs.style.typoLines(1, 'left'),
                                                  '&:focus': {
                                                       borderColor: 'primary.main',
                                                  }
                                             }}
                                             placeholder="Nhập bình luận của bạn tại đây nhé..."
                                        />


                                        <LoadingButton
                                             variant="outlined"
                                             size="medium"

                                             sx={{
                                                  width: "max-content",
                                                  border: '1px solid primary.main',
                                                  color: "secondary.colorText",
                                                  marginTop: '1rem',
                                                  padding: '0.6rem 1rem',
                                                  ...uiConfigs.style.typoLines(1, 'left'),
                                                  display: 'flex',
                                                  alignItems: "center",
                                                  fontSize: '0.8rem'

                                             }}
                                             endIcon={<SendOutlinedIcon />}
                                             loadingPosition="start"
                                             loading={onRequest}
                                             onClick={addComment}

                                        >
                                             Gửi Đánh Giá
                                        </LoadingButton>

                                   </Fragment>



                              )}


                         </Box>

                    </Container>
               )}

          </Fragment>
     );
};

export default PhotoReview;