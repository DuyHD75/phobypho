import mongoose, { Schema } from 'mongoose';
import modelOptions from './model.options.js';
import { ORDER_STATUS } from '../configs/enum.config.js';

const bookingSchema = new Schema({
     photo: {
          type: mongoose.Types.ObjectId,
          ref: "Photo",
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
     servicePackage: {
          type: String,
          required: true
     },
     booking_date: {
          type: Date,
          default: Date.now,
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
          const completedBookings = await this.model('Booking').findOne({ customer: this.customer, status: ORDER_STATUS.pending });

          if (completedBookings) {
               throw new Error("You have completed bookings. You can't create a new booking.");
          }
          next();
     } catch (error) {
          next(error);
     }
});

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;
