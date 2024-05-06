import express from 'express';
import photographerController from '../controllers/photographer.controller.js';
import tokenMiddleware from '../middlewares/token.middleware.js';

const router = express.Router({ mergeParams: true });


router.get("/", photographerController.getPhotographerByLocation);

router.post("/updateStatus", tokenMiddleware.authenticate, photographerController.updateStatus);

router.post("/updateProfile", tokenMiddleware.authenticate, photographerController.updatePhotographer);

router.get("/:photoId/booking", tokenMiddleware.authenticate, photographerController.getBookingByPhotoId);

router.get("/:photographerId/bookingList", tokenMiddleware.authenticate, photographerController.getBookingOfPhotographer);



export default router;