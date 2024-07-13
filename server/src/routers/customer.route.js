import express from 'express';
import tokenMiddleware from '../middlewares/token.middleware.js';
import customerController from '../controllers/customer.controller.js';

const router = express.Router({ mergeParams: true });


router.post('/bookings', tokenMiddleware.authenticate, customerController.createNewBooking);

router.get('/:customerId/bookings', tokenMiddleware.authenticate, customerController.getCustomerBooking);

router.get('/', tokenMiddleware.authenticate, customerController.getCustomerByAccountId);

router.get('/vouchers', tokenMiddleware.authenticate, customerController.getCustomerVouchers);

router.put('/:customerId/points', customerController.updatePoints);

router.get('/:photoId/booking', tokenMiddleware.authenticate, customerController.getCustomerBookingByPhotoId);

router.put('/bookings/:bookingId/status', tokenMiddleware.authenticate, customerController.updateBookingStatus);

router.post('/create-payment-link', tokenMiddleware.authenticate, customerController.generatePaymentLink);


router.post("/receive-hook", customerController.receiveHookPayment);
export default router;