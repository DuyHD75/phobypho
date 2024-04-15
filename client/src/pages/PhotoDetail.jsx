import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import uiConfigs from "../configs/ui.config";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import photoApi from "../api/modules/photo.api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import textConfigs from "../configs/text.config";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PhotoReview from "../components/common/PhotoReview";
import ServicePackage from "../components/common/ServicePackage";
import { setGlobalLoading } from "../redux/features/globalLoading";
import { toast } from "react-toastify";
import moment from "moment";
import ModalImageSlider from "../components/common/ModalImageSlider";

const PhotoDetailPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [onRequest, setOnRequest] = useState(false);
  const { photo_id } = useParams();
  const [photo, setPhoto] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [albumSelected, setAlbumSelected] = useState([]);
  const [isOpenModalSlider, setIsOpenModalSlider] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
    const getPhotoDetail = async () => {
      // dispatch(setGlobalLoading(true));
      const { response, err } = await photoApi.getPhotoDetail({ photo_id });
      // dispatch(setGlobalLoading(false));
      if (response) {
        setPhoto(response);
      }
      if (err) toast.error(err.message);
    };

    getPhotoDetail();
  }, [photo_id, dispatch]);

  const handleLikeCountClick = async () => {
    try {
      const likeCount = photo.likeCount + 1;
      console.log(likeCount);
      const { response, err } = await photoApi.updatePhoto({
        photo_id,
        likeCount,
      });
      if (err) toast.error(err.message);

      if (response) console.log(response);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleAlbumClick = (album) => {
    setAlbumSelected(album);
    setIsOpenModalSlider(true);
  }

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
        <Box
          sx={{
            color: "secondary.colorText",
            ...uiConfigs.style.mainContent,
            padding: { xs: "16px", md: "0 4rem" },
            marginBottom: "4rem",
          }}
        >
          {/*Header photo detail */}
          <Box sx={{ marginTop: { xs: "5rem", md: "8rem", lg: "8rem" } }}>
            <Typography
              sx={{
                ...uiConfigs.style.typoLines(1, "left"),
                fontSize: { xs: "2rem", md: "3rem", lg: "4rem" },
                fontWeight: 800,
                position: "relative",
                "::before": {
                  position: "absolute",
                  content: '""',
                  width: "2rem",
                  height: "2px",
                  borderRadius: "10px",
                  bgcolor: "#C48F56",
                  bottom: 0,
                },
              }}
            >
              {photo.title}
            </Typography>

            <Typography
              sx={{
                ...uiConfigs.style.typoLines(1, "left"),
                margin: "1rem 0",
              }}
            >
              {moment(photo.createdAt).format("dddd, MMMM YYYY")}
            </Typography>
          </Box>
          {/*End header photo detail */}

          {/*Content photo detail */}
          <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
            <Box
              className="photo_detail_info"
              sx={{
                width: { xs: "100%", sm: "100%", md: "60%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "50%",
                  ...uiConfigs.style.backgroundImage(photo.poster),
                  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                }}
              />

              <Box>
                <Typography
                  sx={{
                    ...uiConfigs.style.typoLines(80, "left"),
                    padding: { xs: "1rem 0", md: "1.6rem 0" },
                    position: "relative",
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


            </Box>

            {/*options */}
            <Box
              className="photo_detail_options"
              sx={{
                width: { xs: "100%", sm: "100%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
                border: "0.2px solid rgba(0,0,0,0.6)",
                padding: "2rem",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    ...uiConfigs.style.typoLines(1, "left"),
                    fontSize: { xs: "1.4rem", md: "1.6rem", lg: "1.8rem" },
                    fontWeight: 500,
                    position: "relative",
                    marginBottom: "1rem",
                    "::before": {
                      position: "absolute",
                      content: '""',
                      width: "2rem",
                      height: "2px",
                      borderRadius: "10px",
                      bgcolor: "#C48F56",
                      bottom: 0,
                    },
                  }}
                >
                  Gói Dịch Vụ
                </Typography>

                {/**Servies */}

                <ServicePackage
                  photo={photo}
                  services={photo.servicePackages}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    ...uiConfigs.style.typoLines(1, "left"),
                    fontSize: { xs: "1.4rem", md: "1.6rem", lg: "1.8rem" },
                    fontWeight: 500,
                    position: "relative",
                    "::before": {
                      position: "absolute",
                      content: '""',
                      width: "2rem",
                      height: "2px",
                      borderRadius: "10px",
                      bgcolor: "#C48F56",
                      bottom: 0,
                    },
                  }}
                >
                  Album Nổi bật
                </Typography>

                <Grid container spacing={2}>
                  {photo.attachments.map((album, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
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
                          border: '1px solid #fff'
                        }}
                        onClick={() => handleAlbumClick(album)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
            {/*options */}
          </Stack>

          {/*Content photo detail */}

          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "76%" },
              margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
            }}
          >
            <PhotoReview photo={photo} />
          </Box>
        </Box>
      )}
    </Fragment>
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
//     bgcolor: "#C48F56",
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
//       bgcolor: "#C48F56",
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
