import express from 'express';
import accountRouter from './account.route.js';
import customerRouter from './customer.route.js';
import photoRouter from './photo.route.js';
import reviewRouter from './review.route.js';
import photographerRouter from './photographer.route.js';
import uploadRouter from './upload.route.js';
import serviceRouter from './service.route.js';
import voucherRouter from './voucher.route.js';
import adminRouter from './admin.route.js';
import bookingRouter from './booking.route.js'

const router = express.Router();

router.use("/accounts", accountRouter);

router.use("/customers", customerRouter);

router.use("/photos", photoRouter);

router.use("/reviews", reviewRouter);

router.use("/photographers", photographerRouter);

router.use("/upload-image", uploadRouter);

router.use("/services", serviceRouter);

router.use("/vouchers", voucherRouter); 

router.use("/admins", adminRouter);

router.use("/bookings", bookingRouter);




// router.use("/checkout", )



export default router;