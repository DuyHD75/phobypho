import voucherModel from '../models/voucher.model.js';
import responseHandler from "../handlers/response.handler.js";
import customerModel from '../models/customer.model.js';



const createVoucher = async (req, res) => {
   try {
      const { name, code, value, expirationDate, pointsRequired, description } = req.body;
      const newVoucher = new voucherModel({ name, code, value, expirationDate, pointsRequired, description });
      await newVoucher.save();
      return responseHandler.created(res, newVoucher, 'Tạo mới voucher thành công');
   } catch (error) {
      return responseHandler.error(res, error, 'Lỗi khi tạo voucher');
   }
};

const getAllVouchers = async (req, res) => {
   try {
      const vouchers = await voucherModel.find();
      return responseHandler.ok(res, vouchers, 'Lấy danh sách voucher thành công');
   } catch (error) {
      return responseHandler.error(res, error, 'Lỗi khi lấy danh sách voucher');
   }
};

const getVoucher = async (req, res) => {
   try {
      const voucher = await voucherModel.findById(req.params.id);
      if (!voucher) {
         return responseHandler.notfound(res, { message: 'Không tìm thấy voucher' }, 'Voucher không tồn tại');
      }
      return responseHandler.ok(res, voucher, 'Lấy thông tin voucher thành công');
   } catch (error) {
      return responseHandler.error(res, error, 'Lỗi khi lấy thông tin voucher hehe');
   }
};

const updateVoucher = async (req, res) => {
   try {
      const { name, code, value, expirationDate, isUsed, pointsRequired, description } = req.body;
      const voucher = await voucherModel.findById(req.params.id);
      if (!voucher) {
         return responseHandler.notfound(res, { message: 'Không tìm thấy voucher' }, 'Voucher không tồn tại');
      }
      voucher.name = name;
      voucher.code = code;
      voucher.value = value;
      voucher.expirationDate = expirationDate;
      voucher.isUsed = isUsed;
      voucher.pointsRequired = pointsRequired;
      voucher.description = description;
      await voucher.save();
      return responseHandler.ok(res, voucher, 'Cập nhật voucher thành công');
   } catch (error) {
      return responseHandler.error(res, error, 'Lỗi khi cập nhật voucher');
   }
};

const deleteVoucher = async (req, res) => {
   try {
      const voucher = await voucherModel.findById(req.params.id);
      if (!voucher) {
         return responseHandler.notfound(res, { message: 'Không tìm thấy voucher' }, 'Voucher không tồn tại');
      }
      await voucher.deleteOne();
      return responseHandler.ok(res, { message: 'Xóa voucher thành công' }, 'Xóa voucher thành công');
   } catch (error) {
      return responseHandler.error(res, error.message, 'Lỗi khi xóa voucher');
   }
};


const exchangeVoucher = async (req, res) => {
   try {
      const { voucherId, pointsRequired } = req.body;

      const customer = await customerModel.findOne({ account: req.account.id });

      if (!customer) {
         return responseHandler.notfound(res, { message: 'Không tìm thấy khách hàng' }, 'Không tìm thấy khách hàng');
      }

      if (customer.accumulated_points < pointsRequired) {
         return responseHandler.badRequest(res, { message: 'Không đủ điểm để đổi voucher' }, 'Không đủ điểm để đổi voucher');
      }

      // if (customer.vouchers.includes(voucherId)) {
      //    return responseHandler.badRequest(res, { message: 'Voucher đã được đổi' }, 'Voucher đã được đổi');
      // }

      customer.accumulated_points -= pointsRequired;
      customer.vouchers.push(voucherId);
      await customer.save();

      return responseHandler.ok(res, { message: 'Đổi voucher thành công' }, 'Đổi voucher thành công');
   } catch (error) {
      return responseHandler.error(res, error, 'Lỗi khi đổi voucher');
   }
};


export default { createVoucher, getAllVouchers, getVoucher, updateVoucher, deleteVoucher, exchangeVoucher };