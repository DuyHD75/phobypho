import privateClient from "../client/private.client";
import publicClient from "../client/public.client";


const photoEndpoints = {
     list: 'photos',
     add: 'photos',
     detail: ({ photoId }) => `photos/${photoId}`,
     search: ({ query }) => `photos/search?query=${query}`,
     update: ({ photoId }) => `photos/${photoId}`,
     remove: ({ photoId }) => `photos/${photoId}`,
}

const photoApi = {
     getListPhotos: async () => {
          try {
               const response = await publicClient.get(photoEndpoints.list());
               return { response }
          } catch (err) {
               return { err }
          }
     },
     getPhotoDetail: async ({ photoId }) => {
          try {
               const response = await publicClient.get(photoEndpoints.detail({ photoId }));
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
     updatePhoto: async ({ photoId }) => {
          try {
               const response = await privateClient.put(photoEndpoints.update({ photoId }));
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
