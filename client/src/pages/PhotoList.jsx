import React, { Fragment, useState, useMemo, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import uiConfigs from "../configs/ui.config";
import { useDispatch, useSelector } from "react-redux";
import PostGrid from "../components/common/PostGrid";
import { LoadingButton } from "@mui/lab";
import photoApi from "../api/modules/photo.api";
import { setGlobalLoading } from "../redux/features/globalLoading";
import { toast } from "react-toastify";
import usePrevious from "../hooks/usePrevious";
import { categories } from "../assets/data";
import { GiMagnifyingGlass } from "react-icons/gi";
import InputAdornment from '@mui/material/InputAdornment';

const PhotoListPage = () => {
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [photoLoading, setPhotoLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [findIndex, setFindIndex] = useState(0);
  const preCategory = usePrevious(currCategory);
  const [currPage, setCurrPage] = useState(0);

  const categoriesMemo = useMemo(() => ["All", "Huế", "Đà Nẵng", "Quảng Nam"], []);





  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  // const onLoadMore = () => {
  //   const newPage = currPage + 1;
  //   setCurrPage(newPage);
  //   const newFilteredList = filterPhotos(currCategory, findIndex).slice(0, newPage * 8);
  //   setFilteredList(newFilteredList);
  // };


  useEffect(() => {
    const getListPhotos = async () => {
      try {
        if (currCategory === 0) {
          dispatch(setGlobalLoading(true));
        }

        setPhotoLoading(true);

        const { response, err } = await photoApi.getListPhotos();


        setPhotoLoading(false);
        dispatch(setGlobalLoading(false));

        if (err) {
          toast.error(err.message);
        } else if (response) {
          const filtered = response.filter(item => item.photographer.status !== "BAN");
          setPhotos([...filtered]);
          setFilteredList(filtered);
        }
      } catch (error) {
        console.error("Error in getListPhotos:", error);
        toast.error("An error occurred while fetching photos.");
      }
    };

    getListPhotos();
  }, []);




  const filterPhotos = useCallback((categoryIndex = 0, userInputText = '') => {
    const selectedCategory = categoriesMemo[categoryIndex];
    const filteredByCategory = selectedCategory === "All" ? photos : photos.filter(photo =>
      photo.photographer.location.toLowerCase().includes(selectedCategory.toLowerCase())
    );

    if (!userInputText) {
      return filteredByCategory;
    } else {
      return filteredByCategory.filter(photo =>
        photo.photographer.location.toLowerCase().includes(userInputText.toLowerCase())
      );
    }
  }, [photos, categoriesMemo]);

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;
    setCurrCategory(categoryIndex);
    const filtered = filterPhotos(categoryIndex);
    setFilteredList(filtered.slice(0, 8));
    setCurrPage(1);
  };

  const debounce = (handler, delay) => {
    let timeout = null;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handler(...args);
      }, delay);
    }
  }

  const handelFilterChange = (event) => {
    const userInputText = event.target.value.toLowerCase();
    const filtered = filterPhotos(currCategory, userInputText);
    setFilteredList(filtered.slice(0, 8));
    setCurrPage(1);
  };


  return (
    <Fragment>
      <Box
        sx={{
          position: "relative",
          ...uiConfigs.style.mainContent,
        }}
      >
        <Stack
          spacing={3}
          direction={{ sx: 'column', md: 'row' }}
          alignItems="center"
          sx={{
            marginTop: "6rem",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Stack direction={'row'} spacing={2}>
            {categories.map((cate, index) => (
              <Button
                variant="outlined"
                key={index}
                size="small"
                sx={{
                  color: currCategory === index ? "primary.main" : "secondary.colorText",
                  border: currCategory === index ? "1px solid primary.main" : "none",
                  borderRight: "none",
                  fontSize: "1rem",
                  ...uiConfigs.style.typoLines(1, "center"),
                  display: "flex",
                  alignItems: "flex-start",
                  textTransform: 'capitalize',
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate.icon}
                {cate.name}
              </Button>
            ))}
          </Stack>
          <TextField
            onChange={debounce(handelFilterChange, 1000)}
            fullWidth
            sx={{
              width: { xs: '100%', md: '30%' },
              color: 'secondary.colorText',
              border: '1px solid secondary.main',
              borderRadius: '0.5rem',
              ...uiConfigs.style.typoLines(1, 'center'),
            }}
            type='text' placeholder='Nhập nơi bạn muốn tìm ...' name='locationText'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GiMagnifyingGlass style={{ fontSize: '1.6rem', color: '#2D89E5' }} />
                </InputAdornment>
              ),
            }}

          />

        </Stack>

        <PostGrid photos={filteredList} />

       
      </Box>
    </Fragment>
  );
};

export default PhotoListPage;


// {photos.length > 10 && (<LoadingButton
//   variant="contained"
//   sx={{
//     marginTop: 8,
//     width: "10rem",
//     color: "secondary.colorText",
//     position: "relative",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     border: "1px solid primary.main",
//     ...uiConfigs.style.typoLines(1, "center"),
//     "&:hover": { bgcolor: "primary.main" },
//   }}
//   loading={photoLoading}
//   onClick={onLoadMore}
// >
//   load more
// </LoadingButton>)}