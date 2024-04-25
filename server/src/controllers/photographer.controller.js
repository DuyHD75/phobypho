import responseHandler from '../handlers/response.handler.js';
import photographerModel from '../models/photographer.model.js';

const updateBookingCount = async (req, res) => {
     try {
          const photographer = await photographerModel.finOne({ account: req.account.id });
          if (!photographer) return responseHandler.notfound(res, "Photographer not found !");
          photographer.bookingCount += 1;

          await photographer.save();

          return responseHandler.ok(res, photographer);
     } catch (error) {
          console.error("Error updating booking count:", error);
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


export default { updateBookingCount, updateStatus, getPhotographerByLocation };

