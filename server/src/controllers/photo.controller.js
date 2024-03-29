import responseHandler from "../handlers/response.handler.js";
import photoModel from "../models/photo.model.js";
import reviewModel from "../models/review.model.js";
import photographerModel from "../models/photographer.model.js";

const getAllPhotoInfo = async (req, res) => {
     try {
          const { location } = req.query;
          let photos, photographers;
          
          if (location.toLowerCase() === 'all') {
               photos = await photoModel.find({}).populate('servicePackages').exec();
               photographers = await photographerModel.find({}).populate("account").exec();
          } else {
               photographers = await photographerModel.find({ location: { $regex: new RegExp(location, 'i') } }).populate("account").exec();
               const photographerIds = photographers.map(photographer => photographer.account);
               photos = await photoModel.find({ author: { $in: photographerIds } }).populate("servicePackages").exec();
          }

          photos = photos.map(photo => {
               const photographer = photographers.find(photographer => photographer.account.equals(photo.author));
               return {
                    photo: photo,
                    photographer: photographer
               };
          });

          if (!photos) return responseHandler.error(res, "Error retrieve photo list !");

          responseHandler.ok(res, photos);
     } catch {
          responseHandler.error(res);
     }
}

const getPhotoDetail = async (req, res) => {
     try {
          const { photo_id } = req.params;

          const photo = await photoModel.findOne({ _id: photo_id });
          const photographer = await photographerModel.findOne({ account: photo.author }).populate("account").exec();

          console.log(photographer);

          if (!photo) return responseHandler.error(res);

          const reviews = await reviewModel.find({ photo_id }).populate("account").sort("-createdAt");

          const photoWithReviews = {
               ...photo.toObject(),
               ...photographer.toObject(),
               reviews: reviews
          };
          responseHandler.ok(res, photoWithReviews);

     } catch {
          responseHandler.error(res);
     }
}

const searchPhotoByMultiFactor = async (req, res) => {
     try {
          const { query, page } = req.query;
          const regex = new RegExp(query, 'i');

          const response = await photoModel.find({
               $or: [
                    { title: regex },
                    { 'author.location': regex }
               ]
          }).populate('author');
          response ? responseHandler.ok(res, response) : responseHandler.error(res);
     } catch {
          responseHandler.error(res);
     }
};

const createNewPost = async (req, res) => {
     try {
          console.log(req.body);
          const photographerId = req.account.id;

          const photo = new photoModel({
               author: photographerId,
               ...req.body
          })

          await photo.save();

          responseHandler.created(res, { ...photo._doc });
     } catch {
          responseHandler.error(res);
     }
}

const updatePost = async (req, res) => {
     try {

          const response = await photoModel.findOneAndUpdate(
               {
                    id: req.params.photo_id,
                    author: req.account.id
               },
               { $set: req.body },
               { new: true }
          );

          if (!response) return responseHandler.error(res, "Update post error !");

          return responseHandler.ok(res, ...response._doc);
     } catch {
          responseHandler.error(res);
     }
}

const deletePost = async (req, res) => {
     try {
          const photographerId = req.account.id;
          const response = await photoModel.findOneAndDelete({
               author: photographerId,
               id: req.params.photo_id
          });
          return responseHandler.ok(res, response);

     } catch {
          responseHandler.error(res);
     }
}




const getAllServicePackages = async (req, res) => {
     try {
          const photo = await photoModel.findById({ _id: req.params.photo_id });
          if (!photo) return responseHandler.notfound(res);
          responseHandler.ok(res, photo.servicePackages);
     } catch {
          responseHandler.error(res);
     }
};

const createServicePackage = async (req, res) => {
     try {
          const photo = await photoModel.findById(req.params.photo_id);
          if (!photo) return responseHandler.notfound(res);
          photo.servicePackages.push(req.body);
          photo.save();
          responseHandler.ok(res, dish);
     } catch {
          responseHandler.error(res);
     }
}


const deleteAllServicePackages = async (req, res, next) => {
     try {
          const photo = photoModel.findById(req.params.photo_id).exec();
          if (!photo) return responseHandler.notfound(res, `Photo id ${req.params.photo_id} does not existed !`);

          photo.servicePackages = [];
          photo.save();
          responseHandler.ok(res, { message: "All service packages were deleted !" });
     } catch {
          responseHandler.error(res);
     }
}



const deleteCommentById = async (req, res, next) => {
     try {
          const photo = await photoModel.findOne({ _id: req.params.photo_id });

          if (!photo) return responseHandler.notfound(res, `Photo id ${req.params.photo_id} not found !`);

          if (!photo.servicePackages || photo.servicePackages.length === 0) return responseHandler.error(res, { message: 'Service packages list is empty !' });

          const packageIndex = photo.servicePackages.findIndex(pac => pac.id.toString() === req.params.package_id);

          if (packageIndex === -1)
               return responseHandler.notfound(res, { message: 'Service package not found or you are not authorized to delete it !' });

          photo.servicePackages.splice(packageIndex, 1);

          await photo.save();

          responseHandler.ok(res, { message: `Service package id ${req.params.package_id} was deleted !`, photo: photo });

     } catch {
          responseHandler.error(res);
     }
};


// ======================================================
const addServicePackageToPhoto = async (req, res) => {
     try {

          const { photo_id, servicePackageId } = req.body
          const photo = await photoModel.findById(photo_id);
          if (!photo) {
               return responseHandler.notfound(res, `Photo id ${req.params.photo_id} does not existed !`);
          }
          photo.servicePackages.push(servicePackageId);
          await photo.save();
          return responseHandler.ok(res, { message: 'Service package added to photo successfully!' });
     } catch (error) {
          return responseHandler.error(res, { message: `Failed to add service package to photo: ${error}` });
     }
}


const deleteServicePackageFromPhoto = async () => {
     try {
          const { photo_id, servicePackageId } = req.body;

          const photo = await photoModel.findById(photo_id);
          if (!photo) {
               throw new Error('Photo not found');
          }
          photo.servicePackages = photo.servicePackages.filter(id => id !== servicePackageId);
          await photo.save();
          return responseHandler.ok(res, { message: 'Service package deleted to photo successfully!' });
     } catch (error) {
          return responseHandler.error(res, { message: `Failed to delete service package to photo: ${error}` });
     }
}


export {
     getAllPhotoInfo, getPhotoDetail, searchPhotoByMultiFactor, createNewPost, updatePost, deletePost,
     deleteCommentById, getAllServicePackages, addServicePackageToPhoto, deleteServicePackageFromPhoto
}