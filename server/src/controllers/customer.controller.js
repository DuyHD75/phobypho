import { ORDER_STATUS } from '../configs/enum.config.js';
import responseHandler from '../handlers/response.handler.js';
import bookingModel from '../models/booking.model.js';
import photoModel from '../models/photo.model.js';

const createNewBooking = async (req, res) => {
     try {
          const { account } = req;
          const { photo_id, servicePackage, total_price, location } = req.body;

          if (!photo_id || !servicePackage || !total_price || !location) {
               return responseHandler.error(res, "Missing required fields")
          }
          const photo = await photoModel.findById(photo_id);

          if (!photo) {
               return responseHandler.notfound(res, "Photo not found");
          }

          const booking = new bookingModel({
               photo: photo._id,
               customer: account._id,
               location: location,
               servicePackage: servicePackage,
               status: ORDER_STATUS.pending,
               total_price: total_price
          });
          await booking.save();

          return responseHandler.created(res, booking);
     } catch (error) {
          return responseHandler.error(res, "Error create new booking: " + error)
     }
};

const viewAllBooking = async (req, res) => {
     try {
          const { account } = req;


          const bookingList = await bookingModel
               .find({ customer: account._id })
               .populate('photo')
               .exec();

          if (!bookingList || bookingList.length === 0) {
               return res.status(404).json({ error: "Booking list empty" });
          }

          return responseHandler.ok(res, bookingList);
     } catch (error) {
          return responseHandler.error(res, "Fetching all booking: " + error)
     }
};


export default { createNewBooking, viewAllBooking };