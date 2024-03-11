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


const PostItem = ({ photo }) => {


     const handleChangeLike = () => {
          console.log("THis")
     }

     return (
          <Card  >
               <Link style={{ textDecoration: 'none' }} to={routesGen.photoDetail()}>
                    <CardMedia
                         component="img"
                         height="194"
                         image="https://plus.unsplash.com/premium_photo-1673264933048-3bd3f5b86f9d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                         alt="Paella dish"
                    />
               </Link>

               <CardHeader
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                    titleTypographyProps={textConfigs.style.headerText}
                    subheaderTypographyProps={textConfigs.style.subText}
               />
               <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{
                         ...uiConfigs.style.typoLines(3, "left")
                    }}>
                         This impressive paella is a perfect party dish and a fun meal to cook
                         together with your guests. Add 1 cup of frozen peas along with the mussels,
                         if you like.
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
                         >12 likes</Typography>
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
