import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import uiConfigs from "../configs/ui.config";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import photoApi from "../api/modules/photo.api";
import PhotoReview from "../components/common/PhotoReview";
import ServicePackage from "../components/common/ServicePackage";
import { toast } from "react-toastify";
import moment from "moment";
import ModalImageSlider from "../components/common/ModalImageSlider";
import WavingHandIcon from '@mui/icons-material/WavingHand';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import customerApi from "../api/modules/customer.api";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { styled, keyframes } from '@mui/system';

const userFiled = [
  {
    'Tên Thợ Chụp Ảnh': 'displayName',
  }, {
    'Địa Chỉ': 'location',
  }, {
    'Tuổi': 'age',
  },
  {
    "Năm Kinh Nghiệm": "experienceYears"
  },
  {
    'Giới Tính': 'gender'
  },
]

const buttonAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;


const PhotoDetailPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { photo_id } = useParams();
  const [photo, setPhoto] = useState();
  const [albumSelected, setAlbumSelected] = useState([]);
  const [isOpenModalSlider, setIsOpenModalSlider] = useState(false);
  const [bookedInfo, setBookedInfo] = useState([]);
  const scrollRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);


    const getBookingByPhotoId = async () => {
      const { response, err } = await customerApi.getBookingByPhotoId(photo_id);
      if (response) setBookedInfo(response);
      if (err) toast.error(err.message);
    };



    const getPhotoDetail = async () => {
      const { response, err } = await photoApi.getPhotoDetail({ photo_id });

      if (response) {
        setPhoto(response);
      }
      if (err) toast.error(err.message);
      if (user) getBookingByPhotoId();
    };

    getPhotoDetail();
  }, [photo_id, dispatch]);



  const handleAlbumClick = (album) => {
    setAlbumSelected(album);
    setIsOpenModalSlider(true);
  }

  const AnimatedButton = styled(Button)`
  animation: ${buttonAnimation} 1s infinite;
`;


  return (
    <Fragment>
      {albumSelected && (
        <ModalImageSlider
          album={albumSelected}
          isOpen={isOpenModalSlider}
          onClose={setIsOpenModalSlider}
        />
      )}
      {photo && (

        <Fragment>
          <Box
            sx={{

              ...uiConfigs.style.mainContent,
              padding: { xs: "16px", md: "0 4rem" },
              marginBottom: "4rem",
            }}
          >
            {/*Header photo detail */}
            <Box sx={{ marginTop: { xs: "5rem", md: "8rem", lg: "8rem" } }}>
              <Box
                sx={{
                  position: "relative",
                  color: "primary.contrastText",
                  ...uiConfigs.style.mainContent,
                  "&::before": {
                    content: "''",
                    width: "100%",
                    height: "30%",
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    zIndex: 2,
                    pointerEvents: "none",
                  },
                }}
              >

                <Stack flexDirection={{ sx: 'column', md: "row" }} alignItems={"center"} justifyContent={'space-around'}>

                  <Box sx={{
                    width: '45%',
                    height: '100%',
                    borderRadius: '10px',
                  }}>
                    <Box
                      sx={{
                        paddingTop: "100%",
                        ...uiConfigs.style.backgroundImage(photo.account.avatar),
                        boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px',
                      }}
                    />
                  </Box>


                  <Box sx={{
                    width: '45%',
                    height: '100%',
                  }}>
                    <Typography sx={{
                      ...uiConfigs.style.typoLines(1, 'left'),
                      fontWeight: '600',
                      display: 'flex',
                      textTransform: 'capitalize',
                      padding: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',

                    }}>
                      <Typography
                        sx={{
                          color: 'secondary.main',
                          textTransform: 'capitalize ',
                          textShadow: '1px 1px 0.5px #000',
                          fontSize: '1rem',
                          fontWeight: '600',
                          width: '30%',
                          ...uiConfigs.style.typoLines(2, "left"),
                        }}
                      >Trạng Thái: </Typography>

                      {photo.status === 'AVAILABLE' ? (
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
                          <WavingHandIcon sx={{ fontSize: '1.2rem', color: "green", mr: '5px' }} />
                          <Typography variant='body2' color="green" sx={{
                            textTransform: 'uppercase', ...uiConfigs.style.typoLines(1, 'right'),
                            fontWeight: '700', fontSize: '1rem',
                          }}>Đang Hoạt Động</Typography>
                        </Stack>
                      ) : photo.status === "BUSY" ? (
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
                          <EventBusyIcon sx={{ fontSize: '1.2rem', color: "orange", mr: '5px' }} />
                          <Typography variant='body2' color="orange" sx={{
                            textTransform: 'uppercase', ...uiConfigs.style.typoLines(1, 'right'),
                            fontWeight: '700', fontSize: '1rem',
                          }}>Đamg Bận</Typography>
                        </Stack>
                      ) : (
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
                          <EventBusyIcon sx={{ fontSize: '1.2rem', color: "red", mr: '5px' }} />
                          <Typography variant='body2' color="red" sx={{
                            textTransform: 'uppercase', ...uiConfigs.style.typoLines(1, 'right'),
                            fontWeight: '700', fontSize: '1rem',
                          }}>Không Hoạt Động</Typography>
                        </Stack>
                      )}
                    </Typography>

                    <Stack flexDirection={'column'} justifyContent={"space-between"}>
                      {userFiled.map((field, index) => (
                        <Stack flexDirection={'row'} justifyContent={"space-between"} key={index} padding={'1rem'}>
                          <Typography
                            sx={{
                              color: 'secondary.main',
                              textTransform: 'capitalize ',
                              textShadow: '1px 1px 0.5px #000',
                              fontSize: '1rem',
                              fontWeight: '600',
                              width: '30%',
                              ...uiConfigs.style.typoLines(2, "left"),
                            }}
                          >
                            {Object.keys(field)[0]}:
                          </Typography>
                          <Typography
                            sx={{
                              color: 'secondary.colorText',
                              textTransform: 'capitalize ',
                              fontSize: '1rem',
                              width: '70%',
                              ...uiConfigs.style.typoLines(2, "right"),
                            }}
                          >
                            {photo.account[field[Object.keys(field)[0]]] || photo[field[Object.keys(field)[0]]]}
                          </Typography>
                        </Stack>
                      ))}

                      <Stack flexDirection="row" alignItems={'center'} justifyContent={'flex-end'} sx={{ position: 'relative' }}>
                        <Box
                          sx={{
                            width: '30%',
                            height: '100%',
                            paddingTop: '2rem',
                            position: 'absolute',
                            top: '-2rem',
                            left: 0
                          }}
                        >
                          <img src="https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/icons%2Fundraw_profile_re_4a55.svg?alt=media&token=7f1af4d2-8582-4dd2-a8d9-265c4624912d" alt="" />
                        </Box>

                        <Typography sx={{
                          ...uiConfigs.style.typoLines(5, 'left'),
                          textTransform: 'normal',
                          color: 'secondary.colorText',
                          fontSize: '0.9rem',
                          marginTop: '3rem',
                          padding: '1rem',
                          width: '90%',
                        }}>

                          {photo.description}
                        </Typography>
                      </Stack>


                    </Stack>

                    <Box>
                      <AnimatedButton
                        variant="contained"
                        sx={{
                          fontFamily: '"Nunito", sans-serif',
                          fontSize: "0.8rem",
                          fontWeight: "500",
                          margin: "auto",
                          ...uiConfigs.style.typoLines(1, 'center'),
                        }}
                        onClick={() => {
                          scrollRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                        }}
                      >
                        Đặt Ngay
                      </AnimatedButton>
                    </Box>


                  </Box>

                </Stack>
              </Box>



            </Box>
            {/*End header photo detail */}

            {/*Content photo detail */}
            <Stack spacing={3} direction={{ xs: "column", md: "row" }} sx={{ paddingTop: '2rem' }} ref={scrollRef}>
              <Box
                className="photo_detail_info"
                sx={{
                  width: { xs: "100%", sm: "100%", md: "55%" },
                  margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
                  color: "secondary.colorText",
                }}

              >
                <Box
                  sx={{
                    paddingTop: "50%",
                    ...uiConfigs.style.backgroundImage(photo.poster),
                    boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px'
                  }}
                />

                <Box sx={{ marginTop: '2rem' }}>
                  <Typography
                    sx={{
                      ...uiConfigs.style.typoLines(1, "left"),
                      fontSize: { xs: "1.2rem", md: "1.4rem", lg: "1.6rem" },
                      fontWeight: 500,
                      textTransform: 'capitalize',
                      position: "relative",
                      "::before": {
                        position: "absolute",
                        content: '""',
                        width: "2rem",
                        height: "2px",
                        borderRadius: "10px",
                        bgcolor: "primary.main",
                        bottom: 0,
                      },
                    }}
                  >
                    Albums
                  </Typography>

                  <Grid container spacing={2}>
                    {photo.attachments.map((album, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index} >
                        <Box
                          sx={{
                            marginTop: "1rem",
                            position: "relative",
                            paddingTop: "100%",
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${album.images[0]})`,
                            backgroundPosition: "top",
                            backgroundSize: "cover",
                            border: '1px solid #fff',
                            borderRadius: '10px'
                          }}
                          onClick={() => handleAlbumClick(album)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>



              {/*options */}
              <Box
                className="photo_detail_options"
                sx={{
                  width: { xs: "100%", sm: "100%", md: "45%" },
                  margin: { xs: "0 auto 1rem", md: "0 1rem 0 0" },
                  padding: "1rem",
                  border: "1px solid rgb(221, 221, 221)",
                  borderRadius: "12px",
                  boxShadow: ' rgba(0, 0, 0, 0.12) 0px 6px 16px'
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      ...uiConfigs.style.typoLines(1, "left"),
                      fontSize: { xs: "1.2rem", md: "1.4rem", lg: "1.6rem" },
                      fontWeight: 500,
                      position: "relative",
                      marginBottom: "0.5rem",
                      textTransform: 'capitalize',
                      color: "secondary.colorText",
                      "::before": {
                        position: "absolute",
                        content: '""',
                        width: "2rem",
                        height: "2px",
                        borderRadius: "10px",
                        bgcolor: "primary.main",
                        bottom: 0,
                      },
                    }}
                  >
                    Chọn Các Gói Dịch Vụ
                  </Typography>

                  {/**Servies */}

                  <ServicePackage
                    photo={photo}
                    services={photo.servicePackages}
                  />

                  <Typography sx={{ ...uiConfigs.style.typoLines(1, 'center'), color: 'green' }}>Chọn các gói dịch vụ phù hợp với bạn nhé !</Typography>
                </Box>

              </Box>
              {/*options */}
            </Stack>

            <Box>
              <Typography
                sx={{
                  ...uiConfigs.style.typoLines(80, "center"),
                  padding: { xs: "1rem 0", md: "1.6rem 0" },
                  position: "relative",
                  color: 'secondary.colorText',
                  "::before": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "0.6px",
                    borderRadius: "10px",
                    bgcolor: "rgba(255,255,255,0.6)",
                    bottom: 0,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  },
                }}
              >
                {photo.descriptions}
              </Typography>
            </Box>

            {/*Content photo detail */}

            <Box
              sx={{
                width: { xs: "100%", sm: "100%", md: "76%" },
                margin: { xs: "0 auto 1rem", md: "0 1rem 0 0" },
              }}
            >
              <PhotoReview photo={photo} bookedInfo={bookedInfo} />
            </Box>
          </Box >


        </Fragment>


      )}
    </Fragment >
  );
};

export default PhotoDetailPage;





// <Box
// className="post_button"
// sx={{
//   display: "flex",
//   flexDirection: "row",
//   padding: "2rem 0",
//   alignItems: "center",
//   justifyContent: "space-between",
//   borderBottom: "0.4px solid rgba(255,255,255,0.5)",
// }}
// >
// <Stack
//   direction={{ sx: "column", md: 'row' }}
//   alignItems={"center"}
//   sx={{
//     bgcolor: "primary.main",
//     paddingRight: " 1rem",
//   }}
// >
//   <IconButton onClick={handleLikeCountClick}>
//     <FavoriteBorderIcon></FavoriteBorderIcon>
//   </IconButton>
//   <Typography variant="body1" sx={textConfigs.style.normalText}>
//     {" "}
//     {`${photo.likeCount} ${photo.likeCount > 1 ? "likes" : "like"
//       }`}
//   </Typography>
// </Stack>

// <Stack
//   direction={"row"}
//   alignItems={"center"}
//   width={"40%"}
//   justifyContent={"space-between"}
// >
//   <Box
//     sx={{
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-around",
//     }}
//   >
//     <IconButton>
//       <NavigateBeforeIcon></NavigateBeforeIcon>
//     </IconButton>
//     <Typography
//       variant="body1"
//       sx={textConfigs.style.normalText}
//     >
//       Previous post
//     </Typography>
//   </Box>

//   <Box
//     sx={{
//       width: "1px",
//       height: "2rem",
//       bgcolor: "primary.main",
//       borderRadius: "10px",
//       margin: "0 10px",
//     }}
//   />

//   <Box
//     sx={{
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-around",
//     }}
//   >
//     <Typography
//       variant="body1"
//       sx={textConfigs.style.normalText}
//     >
//       Next post
//     </Typography>
//     <IconButton>
//       <NavigateNextIcon></NavigateNextIcon>
//     </IconButton>
//   </Box>
// </Stack>
// </Box>


// <Stack
//   flexDirection={{ sx: 'column', md: 'row' }}
//   alignItems={"center"}
//   justifyContent={"space-between"}
//   width={"50%"}
// >
//   <Typography
//     sx={{
//       ...uiConfigs.style.typoLines(1, "left"),
//       margin: "1rem 0",
//       color: 'secondary.main',
//       textShadow: '1px 1px 0.8px #333',
//     }}
//   >
//     {moment(photo.createdAt).format("dddd, MMMM YYYY")}
//   </Typography>


// </Stack>