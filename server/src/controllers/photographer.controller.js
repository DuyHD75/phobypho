import responseHandler from '../handlers/response.handler.js';
import photographerModel from '../models/photographer.model.js';



const updatePhotographer = async (req, res) => {
     try {
          const photographerId = req.params.id;
          const updateData = req.body;

          const updatedPhotographer = await photographerModel.findByIdAndUpdate(
               photographerId,
               updateData,
               { new: true }
          );

          if (!updatedPhotographer) {
               return responseHandler.notfound(res, "Không tìm thấy tài khoản này!");
          }
          responseHandler.ok(res, updatedPhotographer);
     } catch (error) {
          console.log("Error updating photographer: ", error.message);
          responseHandler.error(res, error.message);
     }
};


// Update the booking count for a photographer
const updateBookingCount = async (req, res) => {
     try {
          const photographerId = req.params.id;
          const incrementValue = req.body.incrementValue;

          const updatedPhotographer = await photographerModel.findByIdAndUpdate(
               photographerId,
               { $inc: { bookingCount: incrementValue } },
               { new: true }
          );

          if (!updatedPhotographer) {
               return responseHandler.notfound(res, "Không tìm thấy tài khoản này!");
          }

          responseHandler.ok(res, updatedPhotographer);
     } catch (error) {
          console.log("Error updating booking count:", error.message);
          responseHandler.error(res, error.message);
     }
};



const getPhotographerByLocation = async (req, res) => {
     try {
          const { location } = req.query;

          const photographer = await photographerModel.find({ location }).populate("account");

          return responseHandler.ok(res, photographer);
     } catch (error) {
          console.error("Error updating booking count:", error);
     }
};

const updateStatus = async (req, res) => {
     try {
          console.log(req.account.id);
          const photographer = await photographerModel.findOne({ account: req.account.id });
          if (!photographer) return responseHandler.notfound(res, "Photographer not found!");
          photographer.status = req.body.status;

          await photographer.save();

          return responseHandler.ok(res, photographer);
     } catch (error) {
          console.error("Error updating booking count:", error);
     }
};



const getBookingByPhotoId = async (req, res) => {
     try {
          const { photoId } = req.params;

          const bookingList = await bookingModel.find({ customer: req.account.id, photo: photoId });

          return responseHandler.ok(res, bookingList);
     } catch (err) {
          return responseHandler.error(res, "Fetching booking by photoId: " + err);
     }
}



export default { updateBookingCount, updateStatus, getPhotographerByLocation, updatePhotographer, getBookingByPhotoId };

