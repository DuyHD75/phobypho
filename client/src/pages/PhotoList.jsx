import React, { Fragment, useState, useMemo, useEffect } from 'react'
import { Box, Button, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import uiConfigs from '../configs/ui.config';
import { useDispatch, useSelector } from 'react-redux';
import setAppState from '../redux/features/appStateSlice';
import PostGrid from '../components/common/PostGrid';
import { LoadingButton } from "@mui/lab"
import photoApi from '../api/modules/photo.api';
import { setGlobalLoading } from '../redux/features/globalLoading';
import { toast } from 'react-toastify';
import usePrevious from "../hooks/usePrevious";

const PhotoListPage = () => {

     const dispatch = useDispatch();
     const { user } = useSelector((state) => state.user);
     const [photos, setPhotos] = useState([]);
     const [filteredList, setFilteredList] = useState([]);

     const [photoLoading, setPhotoLoading] = useState(false);
     const [currCategory, setCurrCategory] = useState(0);
     const [findIndex, setFindIndex] = useState(0);
     const preCategory = usePrevious(currCategory);
     const [currPage, setCurrPage] = useState(0)
     const categoriesMemo = useMemo(() => ["All", "Hue", "Da Nang", "Quang Nam"], []);

     const category = ["All", "Hue", "Da Nang", "Quang Nam"]


     const onLoadMore = () => setCurrPage(currPage + 1);

     useEffect(() => {
          window.scrollTo(0, 0);
     }, [dispatch]);

     useEffect(() => {
          const getListPhotos = async () => {
               try {
                    if (currCategory === 0) {
                         dispatch(setGlobalLoading(true));
                    }

                    setPhotoLoading(true);

                    const { response, err } = await photoApi.getListPhotos({
                         location: categoriesMemo[currCategory]
                    });

                    setPhotoLoading(false);
                    dispatch(setGlobalLoading(false));

                    if (err) {
                         toast.error(err.message);
                    } else if (response) {
                         setPhotos([...response]);
                    }
               } catch (error) {
                    console.error("Error in getListPhotos:", error);
                    toast.error("An error occurred while fetching photos.");
               }
          };

          getListPhotos();
     }, [currCategory, preCategory, currPage, dispatch]);



     const onCategoryChange = (categoryIndex) => {
          if (currCategory === categoryIndex) return;
          setCurrCategory(categoryIndex);
          setPhotos([]);
          setCurrPage(1);
     }

     return (
          <Fragment>
               <Box
                    sx={{
                         position: 'relative',
                         ...uiConfigs.style.mainContent
                    }}
               >
                    <Stack spacing={3} direction={'column'}
                         alignItems="center"
                         sx={{
                              marginTop: '8rem'
                         }}
                    >
                         <Typography fontWeight={"700"} variant="h5" sx={{
                              ...uiConfigs.style.typoLines(1, 'center'),
                              fontSize: { xs: '2rem', md: '4rem' },
                              textTransform: 'capitalize'
                         }}>
                              Blog grid
                         </Typography>

                         <Stack direction='row' spacing={2}>
                              {category.map((cate, index) => (
                                   <Button
                                        key={index}
                                        size="large"
                                        sx={{
                                             color: currCategory === index ? "#C48F56" : "text.primary",
                                             border: currCategory === index ? '1px solid #C48F56' : "none",
                                             borderRight: 'none',
                                             fontSize: '1rem',
                                             ...uiConfigs.style.typoLines(1, 'center')
                                        }}
                                        onClick={() => onCategoryChange(index)}
                                   >{cate}</Button>
                              ))}
                         </Stack>
                    </Stack>


                    <PostGrid photos={photos} />


                    <LoadingButton
                         sx={{
                              marginTop: 8, width: '10rem', color: '#fff',
                              position: 'relative', left: '50%', transform: 'translate(-50%, -50%)',
                              border: '1px solid #C48F56',
                              ...uiConfigs.style.typoLines(1, 'center'),
                              "&:hover": { bgcolor: '#C48F56' }
                         }}
                         loading={photoLoading}
                         onClick={onLoadMore}
                    >
                         load more
                    </LoadingButton>


               </Box>

          </Fragment>
     )
}

export default PhotoListPage;
// Next to me