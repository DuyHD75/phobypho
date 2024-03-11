import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const servicePackageSchema = new Schema({
     name: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true
     },
     price: {
          type: Number,
          required: true
     },
});


export default mongoose.model("Photo", Schema({
     title: {
          type: String,
          required: true
     },
     descriptions: {
          type: String,
          required: true
     },
     author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Photographer',
          required: true,
          unique: true
     },
     poster: {
          type: String,
          require: true
     },
     attachments: [String],
     servicePackages: [servicePackageSchema],
     likeCount: {
          type: Number,
          default: 0
     }
}, modelOptions));