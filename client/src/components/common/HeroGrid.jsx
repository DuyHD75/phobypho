import React, { useState, useEffect, Fragment } from 'react'
import { Typography, Box, Stack } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import uiConfigs from '../../configs/ui.config';
import photoApi from '../../api/modules/photo.api';
import { toast } from 'react-toastify';
import { setGlobalLoading } from '../../redux/features/globalLoading';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const HeroGrid = () => {

  const [photoList, setPhotoList] = useState([]);
  const [photoLoading, setPhotoLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getListPhotos = async () => {
      try {

        dispatch(setGlobalLoading(true));

        setPhotoLoading(true);

        const { response, err } = await photoApi.getListPhotos();
        setPhotoLoading(false);
        dispatch(setGlobalLoading(false));


        if (response) {
          setPhotoList([...response]);
        }
        if (err) {
          toast.error(err.message);
        }

      } catch (error) {
        console.error("Error in getListPhotos:", error);
        toast.error("An error occurred while fetching photos.");
      }
    };

    getListPhotos();

  }, []);


  const handleImageLoad = (imageId) => {
    const updatedImageData = photoList.map((img) => {
      if (img.id === imageId) {
        const aspectRatio = img.aspectRatio || (img.width / img.height);
        return {
          ...img,
          aspectRatio,
        };
      }
      return img;
    });
    setPhotoList(updatedImageData);
  };


  return (

    <Fragment>

      <Typography
        sx={{
          fontFamily: '"Nunito", sans-serif',
          position: 'relative',
          fontWeight: '800',
          textTransform: 'uppercase',
          paddingRight: '10px',
          color: 'secondary.main',
          fontSize: { xs: '1rem', md: '2rem' },
          "&::before": {
            content: "''",
            position: 'absolute',
            left: '38%',
            bottom: 0,
            width: "10rem",
            height: "2px",
            background: 'primary.main'
          }
        }}
        textAlign={"center"}
      >
        Top 10
        <span style={{
          color: 'secondary.colorText',
          paddingLeft: '10px',
          fontWeight: '700',
        }}>Thợ Chụp ảnh</span>
      </Typography>

      <Box sx={{ width: '100%', height: "auto", }}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {photoList.map((item, index) => (
            <Link to={`/photos/${item.photo.id}`}>
              <ImageListItem
                key={index}
                sx={{
                  margin: "0 5px",
                  borderRadius: "20px",
                  "&:hover .photo_info": { opacity: 1, bottom: 0 },
                  "&:hover .media-back-drop": { opacity: 1 },
                  color: "secondary.colorText",
                  boxShadow: 3,
                  borderColor: 'primary.main'
                }}
              >
                <img
                  srcSet={`${item.photo.poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.photo.poster}?w=248&fit=crop&auto=format`}
                  alt={item.photo.title}
                  loading="lazy"
                  style={{
                    objectFit: 'cover'
                  }}
                />

                <Box className="media-back-drop" sx={{
                  opacity: { xs: 1, md: 0 },
                  transition: "all 0.3s ease",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))"
                }} />

                <Box
                  className="photo_info"
                  sx={{
                    transition: 'all .3s ease',
                    opacity: { xs: 1, md: 0 },
                    position: 'absolute',
                    top: 0,
                    height: 'max-content',
                    boxSizing: 'border-box',
                    padding: { xs: '10px', md: '2rem 1rem ' }
                  }}
                >
                  <Stack spacing={{ xs: 1, md: 2 }} direction={'row'} alignItems={'center'}>
                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', md: '3rem' },
                        fontWeight: '800',
                        color: 'rgba(255, 255, 255, 0.4)',
                        position: 'relative',
                        left: '0.5rem',
                        paddingLeft: '20px',
                        WebkitTextStroke: '2px #000',
                        "::before": {
                          content: '""',
                          position: 'absolute',
                          width: '4rem',
                          height: '2px',
                          bgcolor: "primary.main",
                          bottom: '10%',
                        }
                      }}

                    >{index + 1}</Typography>
                    <Typography
                      variant="body1"
                      fontWeight="700"
                      sx={{
                        ...uiConfigs.style.typoLines(1, "left"),
                        color: 'rgba(255, 255, 255, 0.9)'
                      }}
                    >
                      {item.photo.title}
                    </Typography>
                  </Stack>
                </Box>
              </ImageListItem>

            </Link>
          ))
          }
        </ImageList >
      </Box >


    </Fragment >


  );
}

export default HeroGrid;