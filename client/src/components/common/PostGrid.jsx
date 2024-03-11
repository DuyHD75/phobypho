import React from 'react';
import { Grid } from '@mui/material';
import PostItem from './PostItem';

const PostGrid = () => {

     // get photo data from DB


     return (
          <Grid container spacing={4} paddingTop={'2rem'} >
               <Grid item xs={12} sm={6} md={4}  >
                    <PostItem />
               </Grid>
               <Grid item xs={12} sm={6} md={4}  >
                    <PostItem />
               </Grid>
               <Grid item xs={12} sm={6} md={4}  >
                    <PostItem />
               </Grid>
               <Grid item xs={12} sm={6} md={4}  >
                    <PostItem />
               </Grid>
               <Grid item xs={12} sm={6} md={4}  >
                    <PostItem />
               </Grid>
               <Grid item xs={12} sm={6} md={4}  >
                    <PostItem />
               </Grid>
               <Grid item xs={12} sm={6} md={4}  >
                    <PostItem />
               </Grid>
               <Grid item xs={12} sm={6} md={4}  >
                    <PostItem />
               </Grid>
               <Grid item xs={12} sm={6} md={4}  >
                    <PostItem />
               </Grid>
               <Grid item xs={12} sm={6} md={4}  >
                    <PostItem />
               </Grid>

          </Grid>
     )
}

export default PostGrid;
