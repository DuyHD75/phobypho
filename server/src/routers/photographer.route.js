import express from 'express';
import photographerController from '../controllers/photographer.controller.js';
import tokenMiddleware from '../middlewares/token.middleware.js';

const router = express.Router({ mergeParams: true });


router.get("/", photographerController.getPhotographerByLocation);

router.post("/updateStatus",tokenMiddleware.authenticate, photographerController.updateStatus);


export default router;