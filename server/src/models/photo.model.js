import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";




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
     },
     poster: {
          type: String,
          require: true 
     },
     attachments: [String],
     servicePackages: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ServicePackage',
          required: true,
          unique: true
     }],
     likeCount: {
          type: Number,
          default: 0
     }
}, modelOptions));