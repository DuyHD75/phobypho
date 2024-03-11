import express from 'express';
import accountRouter from './account.route.js';
import customerRouter from './customer.route.js';
import photoRouter from './photo.route.js';
import reviewRouter from './review.route.js';

const router = express.Router();

router.use("/accounts", accountRouter);

router.use("/customers", customerRouter);

router.use("/photos", photoRouter);

router.use("/reviews", reviewRouter);


export default router;