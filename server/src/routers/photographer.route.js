import express from 'express';
import photographerController from '../controllers/photographer.controller.js';

const router = express.Router();


router.get("/", photographerController.getPhotographerByLocation);


export default router;