import mongoose from "mongoose";
import modelOptions from "./model.options.js";


const voucherSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   code: {
      type: String,
      required: true,
      unique: true,
   },
   value: {
      type: Number,
      required: true,
   },
   expirationDate: {
      type: Date,
      required: true,
   },
   isUsed: {
      type: Boolean,
      default: false,
   },
   pointsRequired: {
      type: Number,
      required: true,
   },
   description: {
      type: String,
      required: true
   },
}, modelOptions);
const voucherModel = mongoose.model('Voucher', voucherSchema);
export default voucherModel;