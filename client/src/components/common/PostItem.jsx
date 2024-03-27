import React from 'react'
import {
     Card, CardActions, CardMedia, CardContent,
     Stack, Typography, CardHeader, IconButton
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCommentIcon from '@mui/icons-material/AddComment';
import textConfigs from '../../configs/text.config';
import { Link } from 'react-router-dom';
import { routesGen } from '../../routers/routes';
import uiConfigs from '../../configs/ui.config';
import moment from 'moment';

const PostItem = ({ photo }) => {



     const handleChangeLike = () => {
          console.log("THis")
     }

     return (
          <Card  >
               <Link style={{ textDecoration: 'none' }} to={routesGen.photoDetail(photo.photo.id)}>
                    <CardMedia
                         component="img"
                         height="194"
                         image={photo.photo.poster}
                         alt="Paella dish"
                    />
               </Link>

               <Stack direction={{ xs: 'column', md: 'row' }} alignItems={"center"} justifyContent={"space-between"}>
                    <CardHeader
                         title={photo.photo.title}
                         subheader={moment(photo.photo.createdAt).format('dddd, MMMM YYYY')}
                         titleTypographyProps={textConfigs.style.headerText}
                         subheaderTypographyProps={textConfigs.style.subText}
                    />
                    <Typography sx={{
                         ...uiConfigs.style.typoLines(1, 'center'),
                         padding: '2rem',
                         fontWeight: '600',
                         color: photo.photographer.status === "AVAILABLE" ? "green" : "red"
                    }}>{photo.photographer.status}</Typography>
               </Stack>
               <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{
                         ...uiConfigs.style.typoLines(3, "left")
                    }}>
                         {photo.photo.descriptions}
                    </Typography>
               </CardContent>
               <CardActions
                    sx={{
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: "space-around"
                    }}
               >
                    <Stack
                         direction={"row"}
                         alignItems={"center"}
                    >
                         <IconButton onClick={handleChangeLike}>
                              <FavoriteBorderIcon></FavoriteBorderIcon>
                         </IconButton>
                         <Typography
                              variant='h5'
                              sx={textConfigs.style.normalText}
                         >{photo.photo.likeCount} likes</Typography>
                    </Stack>

                    <Stack
                         direction={"row"}
                         alignItems={"center"}
                    >
                         <IconButton>
                              <AddCommentIcon />
                         </IconButton>
                         <Typography
                              variant='h5'
                              fontFamily={"Saira Condensed"}
                              fontSize={"1rem"}
                         >Comments</Typography>
                    </Stack>
               </CardActions>
          </Card>
     )
}

export default PostItem
