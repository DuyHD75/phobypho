import responseHandler from "../handlers/response.handler.js";
import photoModel from "../models/photo.model.js";

const getAllPhoto = async (req, res) => {
     try {
          const { page = 1 } = req.query;
          const response = await photoModel.find({}).limit(page * 10);
          if (!response) return responseHandler.error(res);
          responseHandler.ok(res, response);
     } catch {
          responseHandler.error(res);
     }
}

const getPhotoDetail = async (req, res) => {
     try {
          const { photo_id } = req.params;

          const response = await photoModel.findOne({ _id: photo_id });

          if (!response) return responseHandler.error(res);

          responseHandler.ok(res, response);

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


const updateServicePackageById = async (req, res, next) => {
     try {
          const photo = await photoModel.findOne({ _id: req.params.photo_id });

          if (!photo) return responseHandler.notfound(res, `Photo id ${req.params.photo_id} not found !`);
          if (!photo.servicePackages || photo.servicePackages.length === 0)
               return responseHandler.error(res, { message: 'Service Packages is empty !' });

          const packageIndex = photo.servicePackages.findIndex(pac => pac.id.toString() === req.params.package_id);

          if (packageIndex === -1) {
               return responseHandler.notfound(res, `Service Package with id ${req.params.package_id} not found !`);
          }

          photo.servicePackages[packageIndex].name = req.body.name;
          photo.servicePackages[packageIndex].price = req.body.price;
          photo.servicePackages[packageIndex].description = req.body.description;
          await photo.save();

          responseHandler.ok(res, photo);
     } catch (error) {
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
}


export {
     getAllPhoto, getPhotoDetail, searchPhotoByMultiFactor, createNewPost, updatePost, deletePost,
     deleteCommentById, getAllServicePackages, createServicePackage, deleteAllServicePackages, updateServicePackageById
}