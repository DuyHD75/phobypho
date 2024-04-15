import React from 'react';
import { Grid } from '@mui/material';
import PostItem from './PostItem';

const PostGrid = ({ photos }) => {

     // get photo data from DB


     return (
          <Grid container spacing={4} paddingTop={'2rem'} >
               {photos.map((photo, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                         <PostItem photo={photo} />
                         
                    </Grid>
               ))}
          </Grid>
     )
}

export default PostGrid;
