import mongoose, { Schema } from "mongoose";
import { PHOTOGRAPHER_STATUS } from '../configs/enum.config.js';


const PhotographerSchema = new Schema({
     account: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Account',
          required: true,
          unique: true
     },
     location: {
          type: String,
          default: ""
     },
     gender: {
          type: String,
          default: ""
     },
     age: {
          type: Number,
          default: 0
     },
     experienceYears: {
          type: Number,
          default: 0
     },
     description: {
          type: String,
          default: ""
     },
     status: {
          type: String,
          type: String,
          default: PHOTOGRAPHER_STATUS.available,
          enum: PHOTOGRAPHER_STATUS
     },
     type_of_account: {
          type: String,
          default: ""
     },
     bookingCount: {
          type: Number,
          default: 0
     }
});

const photographerModel = mongoose.model("Photographer", PhotographerSchema);

export default photographerModel;

