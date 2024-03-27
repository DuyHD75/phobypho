import express from 'express';
import accountRouter from './account.route.js';
import customerRouter from './customer.route.js';
import photoRouter from './photo.route.js';
import reviewRouter from './review.route.js';
import photographerRouter from './photographer.route.js';
import uploadRouter from './upload.route.js';
import serviceRouter from './service.route.js';

const router = express.Router();

router.use("/accounts", accountRouter);

router.use("/customers", customerRouter);

router.use("/photos", photoRouter);

router.use("/reviews", reviewRouter);

router.use("/photographers", photographerRouter);

router.use("/upload-image", uploadRouter);

router.use("/services", serviceRouter)



export default router;