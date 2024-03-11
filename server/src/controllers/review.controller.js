import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const addReview = async (req, res) => {
     try {
          const review = new reviewModel({
               account: req.account.id,
               ...req.body
          });

          await review.save();

          responseHandler.created(res, {
               ...review._doc,
               id: review.id,
               account: req.account
          });
     } catch {
          responseHandler.error(res);
     }
};

const removeReview = async (req, res) => {
     try {
          const { reviewId } = req.params;
          const review = await reviewModel.findOneAndDelete({ _id: reviewId, account: req.account.id });
          if (!review) return responseHandler.notfound(res);
          responseHandler.ok(res);
     } catch {
          responseHandler.error(res);
     }
};

const getReviewsOfAccount = async (req, res) => {
     try {
          const reviews = await reviewModel.find({
               account: req.account.id
          }).sort("-createdAt");

          responseHandler.ok(res, reviews);
     } catch {
          responseHandler.error(res);
     }
}

export default { addReview, removeReview, getReviewsOfAccount };