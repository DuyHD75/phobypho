import privateClient from "../client/private.client";
import publicClient from "../client/public.client";


const photoEndpoints = {
     list: ({ location }) => `/photos?location=${location}`,
     add: '/photos',
     detail: ({ photo_id }) => `/photos/${photo_id}`,
     search: ({ query }) => `/photos/search?query=${query}`,
     update: ({ photo_id }) => `/photos/${photo_id}`,
     remove: ({ photo_id }) => `/photos/${photo_id}`,
}

const photoApi = {
     getListPhotos: async ({ location }) => {
          try {
               console.log(photoEndpoints.list({ location }))
               const response = await publicClient.get(photoEndpoints.list({ location }));
               return { response }
          } catch (err) {
               return { err }
          }
     },
     getPhotoDetail: async ({ photo_id }) => {
          try {
               const response = await publicClient.get(photoEndpoints.detail({ photo_id }));
               return { response }
          } catch (err) {
               return { err }
          }
     },
     searchPhoto: async ({ query }) => {
          try {
               const response = await publicClient.get(photoEndpoints.search({ query }));
               return { response }
          } catch (err) {
               return { err }
          }
     },
     updatePhoto: async ({ photoId, likeCount }) => {
          try {
               const response = await privateClient.put(photoEndpoints.update({ photoId }), { likeCount });
               return { response }
          } catch (err) {
               return { err }
          }
     },
     createPhoto: async ({ photoData }) => {
          try {
               const response = await privateClient.delete(photoEndpoints.post({ photoData }));
               return { response }
          } catch (err) {
               return { err }
          }
     },
     removePhoto: async ({ photoId }) => {
          try {
               const response = await privateClient.put(photoEndpoints.remove({ photoId }));
               return { response }
          } catch (err) {
               return { err }
          }
     }
};


export default photoApi;
