import express from 'express';
import tokenMiddleware from '../middlewares/token.middleware.js';
import bookingController from '../controllers/booking.controller.js';

const router = express.Router({ mergeParams: true });

router.put('/:bookingId/confirm-completed', tokenMiddleware.authenticate, bookingController.confirmCompleted);

export default router;