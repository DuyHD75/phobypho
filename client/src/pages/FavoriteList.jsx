import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Container from "../components/common/Container";
import favoriteApi from "../api/modules/favorite.api";
import UserSidebar from "../components/common/UserSidebar";
import PostItem from "../components/common/PostItem";
import uiConfigs from "../configs/ui.config";
import NotFound from "../components/common/NotFound";

const FavoriteItem = ({ photo, onRemoved }) => {

     const [onRequest, setOnRequest] = useState(false);

     const onRemove = async () => {
          if (onRequest) return;
          setOnRequest(true);
          const { response, err } = await favoriteApi.remove({ favoriteId: photo.id });
          setOnRequest(false);

          if (err) toast.error(err.message);
          if (response) {
               toast.success("Xóa khỏi danh sách yêu thích thành công !");
               onRemoved(photo.id);
          }
     };
     return (
          <Fragment>
               <PostItem photo={photo} />
               <LoadingButton
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    startIcon={<DeleteIcon />}
                    loadingPosition="start"
                    loading={onRequest}
                    onClick={onRemove}
               >
                    remove
               </LoadingButton>
          </Fragment>);
};

const FavoriteList = () => {
     const [photos, setPhotos] = useState([]);
     const [filteredFavorites, setFilteredFavorites] = useState([]);
     const [page, setPage] = useState(1);
     const [count, setCount] = useState(0);


     const skip = 8;

     useEffect(() => {
          const getFavorites = async () => {
               const { response, err } = await favoriteApi.getList();
               if (err) toast.error(err.message);
               if (response) {
                    setCount(response.length);
                    setPhotos([...response]);
                    setFilteredFavorites([...response].splice(0, skip));
               }

          };
          getFavorites();
     }, []);

     const onLoadMore = () => {
          setFilteredFavorites([...filteredFavorites, ...[...photos].splice(page * skip, skip)]);
          setPage(page + 1);
     };

     const onRemoved = (id) => {
          const newMedias = [...photos].filter(e => e.id !== id);
          setPhotos(newMedias);
          setFilteredFavorites([...newMedias].splice(0, page * skip));
          setCount(count - 1);
     };

     return (
          <UserSidebar>
               <Typography sx={{
                    ...uiConfigs.style.typoLines(1, 'left'),
                    fontSize: '1rem',
                    color: 'primary.headerColor',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    bgcolor: '#172149',
                    padding: '1rem',
                    borderRadius: '10px',
                    border: '2px solid rgba(255,255,255,0.1)',
                    textTransform: 'capitalize',
               }}>Danh sách yêu thích </Typography>

               {filteredFavorites.length > 0 ? (
                    <Box>
                         <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
                              {filteredFavorites.map((photo, index) => (
                                   <Grid item xs={12} sm={6} md={4} key={index}>
                                        <FavoriteItem photo={photo} onRemoved={onRemoved} />
                                   </Grid>
                              ))}
                         </Grid>
                         {filteredFavorites.length < photos.length && (
                              <Button onClick={onLoadMore}>load more</Button>
                         )}
                    </Box>) : (
                         <NotFound/>
               )}
          </UserSidebar>
     );
};

export default FavoriteList;
