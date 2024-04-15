import privateClient from "../client/private.client";

const uploadImageEndpoint = {
  uploadByLink: "/upload-image",
  uploadByFiles: "/upload-image",
  uploadAvatar: "/upload-image/avatar",
};

const uploadImageApi = {
  uploadPhotoByFiles: async (images) => {
    try {
      const response = await privateClient.post(
        uploadImageEndpoint.uploadByFiles,
        images,
        {
          multipart: true,
        }
      );
      return response;
    } catch (err) {
      console.error("Error uploading image:", err);
      return { err };
    }
  },
};

export default uploadImageApi;
