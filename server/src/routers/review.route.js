import express from 'express';
import { body } from 'express-validator';
import reviewController from '../controllers/review.controller.js'
import tokenMiddleware from '../middlewares/token.middleware.js';
import requestHandler from '../handlers/request.handler.js';
import customerController from '../controllers/customer.controller.js';


const router = express.Router({ mergeParams: true });

router.get(
     "/",
     tokenMiddleware.authenticate,
     reviewController.getReviewsOfAccount
);

router.post(
     "/",
     tokenMiddleware.authenticate,
     body('photo_id')
          .exists().withMessage("Photo id is required !")
          .isLength({ min: 1 }).withMessage("Photo id can not be empty !"),
     body('photo_poster')
          .exists().withMessage("Photo poster is required !")
          .isLength({ min: 1 }).withMessage("Photo id can not be empty !"),
     body('content')
          .exists().withMessage("Contend is required !")
          .isLength({ min: 0 }).withMessage("Content can not be empty !"),
     requestHandler.validate,
     reviewController.addReview, 
     customerController.updateCustomerPoints
);

router.delete(
     "/:reviewId",
     tokenMiddleware.authenticate,
     reviewController.removeReview
);

export default router;