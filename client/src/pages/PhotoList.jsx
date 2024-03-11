import React, { Fragment, useState, useMemo, useEffect } from 'react'
import { Box, Button, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import uiConfigs from '../configs/ui.config';
import { useDispatch } from 'react-redux';
import setAppState from '../redux/features/appStateSlice';
import PostGrid from '../components/common/PostGrid';
import { LoadingButton } from "@mui/lab"


const PhotoListPage = () => {

     const [photos, setphotos] = useState([]);

     const [photoLoading, setPhotoLoading] = useState(false);

     const [currCategory, setCurrCategory] = useState(0);

     const dispatch = useDispatch();
     const [currPage, setCurrPage] = useState(0)

     const categoriesMemo = useMemo(() => ["All", "Hue", "Da Nang", "Quang Nam"], []);

     const category = ["All", "Hue", "Da Nang", "Quang Nam"]


     const onLoadMore = () => setCurrPage(currPage + 1);

     const onCategoryChange = (categoryIndex) => {
          if (currCategory === categoryIndex) return;
          setphotos([]);
          setCurrCategory(categoryIndex);
     }

     // useEffect(() => {
     //      dispatch(setAppState(mediaType));
     //      window.scrollTo(0, 0);
     // }, [dispatch]);


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

                    
                    <PostGrid />


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
