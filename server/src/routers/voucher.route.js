import express from 'express';
import voucherController from '../controllers/voucher.controller.js';
import tokenMiddleware from '../middlewares/token.middleware.js';
const router = express.Router({ mergeParams: true });

router.post('/', voucherController.createVoucher);

router.get('/', voucherController.getAllVouchers);

router.get('/:id', voucherController.getVoucher);

router.put('/:id', voucherController.updateVoucher);

router.delete('/:id', voucherController.deleteVoucher);

router.post('/exchange', tokenMiddleware.authenticate, voucherController.exchangeVoucher);

export default router;