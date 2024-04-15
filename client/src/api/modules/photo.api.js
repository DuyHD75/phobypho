import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const photoEndpoints = {
  list: ({ location }) => `/photos?location=${location}`,
  add: "/photos",
  updatePostByAuth: "/photos/post",
  detail: ({ photo_id }) => `/photos/${photo_id}`,
  search: ({ query }) => `/photos/search?query=${query}`,
  update: ({ photo_id }) => `/photos/${photo_id}`,
  remove: ({ photo_id }) => `/photos/${photo_id}`,
  getPost: ({ authorId }) => `/photos/post/${authorId}`
};

const photoApi = {
  getListPhotos: async ({ location }) => {
    try {
      const response = await publicClient.get(
        photoEndpoints.list({ location })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getPhotoDetail: async ({ photo_id }) => {
    try {
      const response = await publicClient.get(
        photoEndpoints.detail({ photo_id })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getPostByAuth: async (authorId) => {
    try {
      const response = await publicClient.get(photoEndpoints.getPost({ authorId }));
      return { response };
    } catch (err) {
      return { err };
    }
  },
  searchPhoto: async ({ query }) => {
    try {
      const response = await publicClient.get(photoEndpoints.search({ query }));
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateLikeCountOfPhoto: async ({ photoId, likeCount }) => {
    try {
      const response = await privateClient.put(
        photoEndpoints.update({ photoId }),
        { likeCount }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  createPhoto: async (photoData) => {
    try {
      const response = await privateClient.post(photoEndpoints.add, photoData);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updatePhotoByAuth: async (photoData) => {
    try {
      const response = await privateClient.put(photoEndpoints.updatePostByAuth, photoData);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  removePhoto: async ({ photoId }) => {
    try {
      const response = await privateClient.delete(
        photoEndpoints.remove({ photoId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default photoApi;
