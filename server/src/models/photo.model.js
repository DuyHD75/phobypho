import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const albumSchema = new Schema({
  albumName: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

const photoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photographer",
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    attachments: [albumSchema], // Array of albums
    servicePackages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServicePackage",
        required: true,
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  modelOptions
);

export default mongoose.model("Photo", photoSchema);
