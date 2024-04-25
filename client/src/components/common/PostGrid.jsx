import React from 'react';
import { Grid, Typography } from '@mui/material';
import PostItem from './PostItem';

const PostGrid = ({ photos }) => {

     return (
          (photos && photos.length > 0) ? (<Grid container spacing={4} paddingTop={'2rem'} >
               {photos.map((photo, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                         <PostItem photo={photo} />
                    </Grid>
               ))}
          </Grid>) : (<Typography variant="h6" align="center">No photos found</Typography>)
     );
};

export default PostGrid;
