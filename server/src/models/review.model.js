import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
     "Review",
     Schema({
          account: {
               type: Schema.Types.ObjectId,
               ref: "Account",
               require: true
          },
          content: {
               type: String,
               require: true
          },
          photo_id: {
               type: String,
               require: true
          },
          photo_poster: {
               type: String,
               require: true
          },
          rating: {
               type: Number,
               min: 1,
               max: 5
          },
          attachments: [String]
     }, modelOptions)
);
