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


const updateStatus = async (req, res) => {
     try {
          const photographer = await photographerModel.finOne({ account: req.account.id });
          if (!photographer) return responseHandler.notfound(res, "Photographer not found !");
          photographer.status = req.body.status;

          await photographer.save();

          return responseHandler.ok(res, photographer);
     } catch (error) {
          console.error("Error updating booking count:", error);
     }
};

export { updateBookingCount, updateStatus };

