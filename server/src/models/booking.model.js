import mongoose, { Schema } from 'mongoose';
import modelOptions from './model.options.js';
import { ORDER_STATUS } from '../configs/enum.config.js';

const bookingSchema = new Schema({
     photo: {
          type: mongoose.Types.ObjectId,
          ref: "Photo",
          required: true
     },
     poster: {
          type: String,
          required: true
     },
     photographer: {
          type: mongoose.Types.ObjectId,
          ref: "Photographer",
          required: true
     },
     photographerName: {
          type: String,
          required: true
     },
     photographerEmail:{
          type: String,
          required: true
     },
     customer: {
          type: mongoose.Types.ObjectId,
          ref: "Customer",
          required: true
     },
     location: {
          type: String,
          required: true
     },
     servicePackageId: {
          type: mongoose.Types.ObjectId,
          ref: "ServicePackage",
          required: true
     },
     servicePackageName: {
          type: String,
          required: true
     },
     booking_date: {
          type: Date,
          required: true
     },
     status: {
          type: String,
          enum: ORDER_STATUS,
     },
     total_price: {
          type: Number,
          require: true
     }
}, modelOptions);

bookingSchema.pre('save', async function (next) {
     try {
          if (this.isNew) {
               const pendingBooking = await this.model('Booking').findOne({ customer: this.customer, status: ORDER_STATUS.pending });

               if (pendingBooking) {
                    throw new Error("Bạn đang có một hóa đơn đang chờ xử lý !");
               }
          }
          next();
     } catch (error) {
          next(error);
     }
});

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;
