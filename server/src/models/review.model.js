import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const ReviewSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    booking_id: {
        type: Schema.Types.ObjectId,
        ref: "Booking",
        unique:true
    },
    content: {
        type: String,
        required: true
    },
    photo_id: {
        type: String,
        required: true
    },
    photo_poster: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    attachments: [String]
}, modelOptions);

ReviewSchema.pre('save', async function(next) {
    try {
        const existingReview = await this.constructor.findOne({
            account: this.account,
            booking_id: this.booking_id
        });
       
        if (existingReview) {
            const error = new Error("Booking này đã được đánh giá.");
            return next(error);
        }
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model("Review", ReviewSchema);
