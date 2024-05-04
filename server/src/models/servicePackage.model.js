import mongoose, { Schema } from "mongoose";


const servicePackageSchema = new Schema({
     name: {
          type: String,
          required: true, 
          unique: true
     },
     description: {
          type: String,
          required: true
     },
     price: {
          type: Number,
          required: true
     },
     numberOfPeople: {
          type: Number,
          required: true
     }, 
     icon: {
          type: String,
          required: true
     },
}, { timestamps: true });


const servicePackageModel = mongoose.model("ServicePackage", servicePackageSchema);

export default servicePackageModel;