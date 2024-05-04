import React, { Fragment, useEffect, useState } from 'react'
import {
     Card, CardActions, CardMedia, CardContent,
     Stack, Typography, CardHeader, IconButton, Box,
} from '@mui/material';

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCommentIcon from '@mui/icons-material/AddComment';
import textConfigs from '../../configs/text.config';
import { Link } from 'react-router-dom';
import { routesGen } from '../../routers/routes';
import uiConfigs from '../../configs/ui.config';
import moment from 'moment';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ExploreIcon from '@mui/icons-material/Explore';
import GradeIcon from '@mui/icons-material/Grade';
import { LoadingButton } from "@mui/lab";
import { useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/features/userSlice';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { useDispatch } from 'react-redux';
import favoriteApi from '../../api/modules/favorite.api';
import { toast } from 'react-toastify';
import favoriteUtils from '../../utils/favorite.utils';

const PostItem = ({ photo }) => {

     const dispatch = useDispatch();
     const { user } = useSelector((state) => state.user);


     const [listFavorites, setListFavorites] = useState([]);

     useEffect(() => {
          const getFavorites = async () => {
               const { response, err } = await favoriteApi.getList();
               if (response) setListFavorites(response);
               if (err) toast.error(err.message);
          };
          user ? getFavorites() : setListFavorites([]);
     }, [user]);


     const [isFavorite, setIsFavorite] = useState(false);
     const [onRequest, setOnRequest] = useState(false);

     useEffect(() => {
          if (favoriteUtils.check({ listFavorites, photoId: photo.photo.id })) setIsFavorite(true);
     }, [listFavorites, photo]);


     const onFavoriteClick = async () => {

          if (!user) return dispatch(setAuthModalOpen(true));

          if (onRequest) return;

          if (isFavorite) {
               onRemoveFavorite();
               return;
          }

          setOnRequest(true);

          const body = {
               photoId: photo.photo.id
          };

          const { response, err } = await favoriteApi.add(body);

          setOnRequest(false);

          if (err) toast.error(err.message);

          if (response) {
               dispatch(addFavorite(response));
               setIsFavorite(true);
               toast.success("Thêm vào yêu thích thành công!");
          }
     };


     const onRemoveFavorite = async () => {

          if (onRequest) return;
          setOnRequest(true);
          console.log(photo.photo.id)

          const favorite = listFavorites.find(e => e.photo.id.toString() === photo.photo.id.toString());

          const { response, err } = await favoriteApi.remove({ favoriteId: favorite.id });

          setOnRequest(false);

          if (err) toast.error(err.message);

          if (response) {
               dispatch(removeFavorite({ favoriteId: favorite.id }));
               setIsFavorite(false);
               toast.success("Xóa khỏi yêu thích thành công!");
          }
     };

     return (
          <Fragment>
               {photo.photographer ? (
                    <Card sx={{
                         boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                         position: 'relative',
                         bgcolor: 'transparent'
                    }} >
                         <Link style={{ textDecoration: 'none' }} to={routesGen.photoDetail(photo.photo.id)}>
                              <CardMedia
                                   borderRadius={"10px"}
                                   component="img"
                                   ojectFit="cover"
                                   height="220"
                                   image={photo.photo.poster}
                                   alt="Paella dish"
                              />
                         </Link>



                         <LoadingButton
                              variant="text"
                              sx={{
                                   "& .MuiButton-starIcon": { padding: '0' },
                                   position: 'absolute',
                                   top: '10px',
                                   right: '10px',
                                   color: 'secondary.contrastText',
                              }}
                              size="large"
                              startIcon={isFavorite === true ? <FavoriteIcon style={{ color: '#ff385c' }} /> : <FavoriteBorderOutlinedIcon />}
                              loadingPosition="center"
                              loading={onRequest}
                              onClick={onFavoriteClick}
                         />


                         <CardHeader
                              title={photo.photographer.account.displayName}
                              subheader={moment(photo.photo.createdAt).format('dddd, MMMM YYYY')}
                              titleTypographyProps={textConfigs.style.headerText}
                              subheaderTypographyProps={textConfigs.style.subText}
                         />

                         <Stack direction={"row"} alignItems={'center'} justifyContent={"space-around"} p={' 0 1rem'}>
                              <Typography sx={{
                                   ...uiConfigs.style.typoLines(1, 'left'),
                                   fontWeight: '600',
                                   display: 'flex',
                                   textTransform: 'capitalize',
                              }}>
                                   {photo.photographer.status === 'AVAILABLE' ? (
                                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                             <WavingHandIcon sx={{ fontSize: '1rem', color: "green", mr: '5px' }} />
                                             <Typography variant='body2' color="green" sx={{
                                                  textTransform: 'uppercase', ...uiConfigs.style.typoLines(1, 'center'),
                                                  fontWeight: '700'
                                             }}>Đang Hoạt Động</Typography>
                                        </Stack>
                                   ) : photo.photographer.status === "BUSY" ? (
                                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                             <EventBusyIcon sx={{ fontSize: '1rem', color: "orange", mr: '5px' }} />
                                             <Typography variant='body2' color="orange" sx={{
                                                  textTransform: 'uppercase', ...uiConfigs.style.typoLines(1, 'center'),
                                                  fontWeight: '700'
                                             }}>Đang Bận</Typography>
                                        </Stack>
                                   ) : (
                                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                             <EventBusyIcon sx={{ fontSize: '1rem', color: "red", mr: '5px' }} />
                                             <Typography variant='body2' color="red" sx={{
                                                  textTransform: 'uppercase', ...uiConfigs.style.typoLines(1, 'center'),
                                                  fontWeight: '700'
                                             }}>Không Hoạt Động</Typography>
                                        </Stack>
                                   )}
                              </Typography>

                              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                   <GradeIcon sx={{ fontSize: '1.2rem', color: 'primary.headerColor', mr: '5px' }} />
                                   <Typography color='secondary.colorText' sx={{ ...uiConfigs.style.typoLines(1, 'center') }}>4.5</Typography>
                              </Stack>

                         </Stack>

                         <CardContent>
                              <Box
                                   color="secondary.colorText"
                                   sx={{
                                        display: 'flex',
                                        flexDirection: 'row',

                                   }}
                              >
                                   <ExploreIcon sx={{ fontSize: '1.2rem', color: "secondary.main", mt: '2px' }} />
                                   <Typography sx={{ ...uiConfigs.style.typoLines(3, "left"), ml: '4px', fontSize: '0.9rem' }}> {photo.photographer.location}</Typography>
                              </Box>
                         </CardContent>

                    </Card >) : (
                    <Card sx={{
                         boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                         position: 'relative',
                         bgcolor: 'transparent'
                    }} >
                         <Link style={{ textDecoration: 'none' }} to={routesGen.photoDetail(photo.photo.id)}>
                              <CardMedia
                                   borderRadius={"10px"}
                                   component="img"
                                   ojectFit="cover"
                                   height="220"
                                   image={photo.photo.poster}
                                   alt="Paella dish"
                              />
                         </Link>

                         <CardHeader
                              title={photo.photo.title}
                              subheader={moment(photo.photo.createdAt).format('dddd, MMMM YYYY')}
                              titleTypographyProps={textConfigs.style.headerText}
                              subheaderTypographyProps={textConfigs.style.subText}
                         />


                    </Card >)}


          </Fragment>
     );
};

export default PostItem;
