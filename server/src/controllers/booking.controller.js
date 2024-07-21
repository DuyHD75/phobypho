import bookingModel from "../models/booking.model.js";
import responseHandler from "../handlers/response.handler.js";
import { ORDER_STATUS, ROLES_LIST } from "../configs/enum.config.js";
const confirmCompleted = async (req, res) => {
    try {
      console.log("confirmCompleted");
       const user = req.account;
       const { bookingId } = req.params;
        const booking = await bookingModel.findById(bookingId);
        if(!booking){
            responseHandler.notFound(res);
            return;
        }
       // Corrected logical check for photographer or customer
       console.log("hee")
       console.log(booking.customer.toString());
       console.log(user.id.toString());
       if (booking.photographer.toString() !== user.id.toString() && booking.customer.toString() !== user.id.toString()){
           responseHandler.unAuthorize(res);
           return;
       }
        // Corrected comparison for user roles
        if(user.role === ROLES_LIST.customer){
           booking.customerCompleted = true;
        }
        if(user.role === ROLES_LIST.photographer){
            booking.photographerCompleted = true;
            console.log("photographerConfirmCompleted");
        }
        if(booking.customerCompleted && booking.photographerCompleted)
            booking.status = ORDER_STATUS.completed;
        await booking.save();
        responseHandler.ok(res, booking);

    }catch(error){
        console.log(error);
        responseHandler.error(res);
    }
};


  export default { confirmCompleted }