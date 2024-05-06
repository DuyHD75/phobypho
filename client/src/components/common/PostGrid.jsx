import React, { Fragment } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import PostItem from './PostItem';
import uiconfig from '../../configs/ui.config';
import NotFound from './NotFound';



const PostGrid = ({ photos }) => {

     return (
          (photos && photos.length > 0) ? (<Grid container spacing={4} paddingTop={'2rem'} >
               {photos.map((photo, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                         <PostItem photo={photo} />
                    </Grid>
               ))}
          </Grid>) : (
               <NotFound />
          )
     );
};

export default PostGrid;
