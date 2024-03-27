import React, { useState, useEffect, Fragment } from 'react'
import { Grid, Card, CardMedia, Typography, Box, ImageListItemBar, Stack } from '@mui/material';
import textConfigs from '../../configs/text.config';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import uiConfigs from '../../configs/ui.config';

const HeroGrid = () => {


  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchedImageData = [
      {
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Bed',
      },
      {
        img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
        title: 'Books',
      },
      {
        img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
        title: 'Sink',
      },
      {
        img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
        title: 'Kitchen',
      },
      {
        img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
        title: 'Blinds',
      },
      {
        img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww',
        title: 'Chairs',
      },
      {
        img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
        title: 'Laptop',
      },
      {
        img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
        title: 'Doors',
      },
      {
        img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
        title: 'Coffee',
      },
      {
        img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
        title: 'Storage',
      },
      {
        img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
        title: 'Candle',
      },
      {
        img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
        title: 'Coffee table',
      },
    ];

    setImageData(fetchedImageData);
  }, []);


  const handleImageLoad = (imageId) => {
    const updatedImageData = imageData.map((img) => {
      if (img.id === imageId) {
        const aspectRatio = img.aspectRatio || (img.width / img.height);
        return {
          ...img,
          aspectRatio,
        };
      }
      return img;
    });
    setImageData(updatedImageData);
  };


  return (

    <Fragment>

      <Typography
        sx={{
          fontFamily: "Saira Condensed",
          position: 'relative',
          fontWeight: '800',
          fontSize: '3rem',
          textTransform: 'uppercase',
          "&::before": {
            content: "''",
            position: 'absolute',
            left: '38%',
            bottom: 0,
            width: "10rem",
            height: "2px",
            background: '#C48F56'

          }
        }}
        fontSize={'2rem'}
        textAlign={"center"}
      >
        Top 10 <span style={{ color: '#C48F56', fontSize: '3rem', fontWeight: '800', }}>Thợ Chụp ảnh</span>
      </Typography>

      <Box sx={{ width: '100%', height: "auto", }}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {imageData.map((item, index) => (
            <ImageListItem key={item.img}
              sx={{
                margin: "0 5px",
                borderRadius: "20px",
                "&:hover .photo_info": { opacity: 1, bottom: 0 },
                "&:hover .media-back-drop": { opacity: 1 },
                color: "primary.text",
                boxShadow: 3,
                borderColor: 'primary.main'
              }}
            >
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
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
                        bgcolor: "#C48F56",
                        bottom: '10%',
                      }
                    }}

                  >{index + 1}</Typography>
                  <Typography
                    variant="body1"
                    fontWeight="700"
                    sx={{
                      fontSize: "1.4rem",
                      ...uiConfigs.style.typoLines(1, "left"),
                      color: 'rgba(255, 255, 255, 0.9)'
                    }}
                  >
                    {item.title}
                  </Typography>
                </Stack>
              </Box>
            </ImageListItem>
          ))
          }
        </ImageList >
      </Box >


    </Fragment >


  );
}

export default HeroGrid;