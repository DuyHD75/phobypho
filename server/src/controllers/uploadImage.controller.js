import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import configs from '../configs/firebase.config.js';
import responseHandler from "../handlers/response.handler.js";

initializeApp(configs.firebaseConfig);
const storage = getStorage();

const uploadAvatar = async (req, res) => {
     try {
          const file = req.file;
          const dateTime = giveCurrentDateTime();

          const storageRef = ref(storage, `avatars/${file.originalname + "       " + dateTime}`);

          const metadata = {
               contentType: file.mimetype,
          };

          const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

          const downloadURL = await getDownloadURL(snapshot.ref);

          responseHandler.ok(res, downloadURL);
     } catch (error) {
          responseHandler.error(res, { message: 'Upload avatar error !' })
     }
}

const removeFileByUrl = async (req, res) => {
     try {
          const { downloadURL } = req.body;
          console.log(downloadURL)
          const fileName = extractFileNameFromUrl(downloadURL);
          const fileRef = storage.refFromURL(downloadURL);
          console.log(fileRef)
          await fileRef.delete();

          responseHandler.ok(res, `Delete file: ${fileName} successfully !`)
     } catch (error) {
          return responseHandler.error(res, { message: 'Error deleting file !' });
     }
};

// Function to extract file name from URL
const extractFileNameFromUrl = (url) => {
     const parts = url.split('/');
     return parts[parts.length - 1];
};



const uploadMultiImages = async (req, res) => {
     try {
          const files = req.files;

          const uploadedFilesUrl = [];

          for (const file of files) {
               const dateTime = giveCurrentDateTime();

               const storageRef = ref(storage, `photos/${file.originalname + "       " + dateTime}`);

               const metadata = {
                    contentType: file.mimetype,
               };

               const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

               const downloadURL = await getDownloadURL(snapshot.ref);
               uploadedFilesUrl.push(downloadURL);
          }

          responseHandler.ok(res, uploadedFilesUrl)

     } catch (error) {
          responseHandler.error(res, error.message);
     }
};



const giveCurrentDateTime = () => {
     const today = new Date();
     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
     const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     const dateTime = date + ' ' + time;
     return dateTime;
};

export default { uploadMultiImages, uploadAvatar, removeFileByUrl };