import responseHandler from "../handlers/response.handler.js";
import accountModel from "../models/account.model.js";
import { ROLES_LIST, PHOTOGRAPHER_STATUS } from "../configs/enum.config.js";
import customerModel from "../models/customer.model.js";
import photographerModel from "../models/photographer.model.js";
import { createToken } from "../utils/token.util.js";
import customerController from "../controllers/customer.controller.js";
import bookingModel from "../models/booking.model.js";

const signup = async (req, res) => {
  try {
    const { username, displayName, password, role, phoneNumber, email } =
      req.body;


    const isExisted = await accountModel.findOne({ username });

    if (isExisted)
      return responseHandler.badRequest(res, "Tài khoản đã tồn tại!");

    const account = new accountModel({
      username,
      displayName,
      email,
      phoneNumber,
      role:
        role === ROLES_LIST.photographer
          ? ROLES_LIST.photographer
          : ROLES_LIST.customer,
    });
    account.setPassword(password);
    await account.save();
    let photographer = null;

    if (role === ROLES_LIST.photographer) {
      const { location } = req.body;
      photographer = new photographerModel({
        account: account.id,
        status: PHOTOGRAPHER_STATUS.available,
        location: location,
        gender: "",
        age: 0,
        description: "",
        experienceYears: 0,
        bookingCount: 0,
      });
      await photographer.save();
    } else {
      const customer = new customerModel({
        account: account.id,
      });
      await customer.save();
    }

    const token = createToken(account.id);

    account.password = undefined;
    account.salt = undefined;

    responseHandler.created(res, {
      token,
      ...account._doc,
      userData: photographer ? photographer : {},
    });
  } catch (error) {
    console.error(error);
    responseHandler.error(res, error.message);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userData = {};

    const account = await accountModel
      .findOne({ username })
      .select(
        "id username displayName password salt phoneNumber email role avatar"
      );

    if (account.role === ROLES_LIST.photographer) {
      const photographer = await photographerModel
        .findOne({ account: account.id })
        .select(
          "location status gender age description experienceYears bookingCount type_of_account"
        );
      userData.location = photographer.location;
      userData.status = photographer.status;
      userData.gender = photographer.gender;
      userData.age = photographer.age;
      userData.description = photographer.description;
      userData.experienceYears = photographer.experienceYears;
      userData.bookingCount = photographer.bookingCount;
      userData.type_of_account = photographer.type_of_account;
    }

    if (account == null)
      return responseHandler.notfound(res, "Tài khoản không tìm thấy !");

    if (!account.validatePassword(password))
      return responseHandler.badRequest(res, "Sai mật khẩu !");

    const token = createToken(account.id);

    account.password = undefined;
    account.salt = undefined;
    userData.token = token;

    responseHandler.created(res, {
      token,
      id: account.id,
      ...account._doc,
      userData,
    });
    req.account = account;

    // Call isNewQuarterPhotographer here without sending a response
    if (account.role === ROLES_LIST.photographer) {
      const currentDate = new Date();
      const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;

      const lastBooking = await bookingModel
        .findOne({ photographer: account._id })
        .sort({ createdAt: -1 });

      if (!lastBooking) {
        return;
      }
      const lastBookingDate = new Date(lastBooking.createdAt);
      const lastBookingQuarter = Math.floor(lastBookingDate.getMonth() / 3) + 1;
      if (currentQuarter > lastBookingQuarter) {
        const photographer = await photographerModel.findOne({
          account: account._id,
        });
        photographer.bookingCount = 0;
        photographer.type_of_account = "";
        await photographer.save();
      } 
   
    }
  } catch (error) {
    console.error("Error in account.controller.login");
    responseHandler.error(res);
  }
};

const isNewQuarterPhotographer = async (req, res) => {
  try {
    const { account } = req;
    if (account.role === ROLES_LIST.photographer) {
      console.log(account._id);
      await customerController.checkRankingOfPhotographer(account._id);
    }
  } catch (error) {
    console.error(error);
    responseHandler.error(res, res.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const account = await accountModel
      .findById(req.account.id)
      .select("id password salt");

    if (!account) return responseHandler.unAuthorize(res);

    if (!account.validatePassword(password))
      return responseHandler.badRequest(res, "Wrong password !");

    account.setPassword(newPassword);
    await account.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    let userInfo = {};
    if (req.account.role === ROLES_LIST.customer) {
      userInfo = await customerModel
        .findOne({ account: req.account.id })
        .populate("account");
    } else {
      userInfo = await photographerModel
        .findOne({ account: req.account.id })
        .populate("account");
    }
    return responseHandler.ok(res, userInfo);
  } catch {
    responseHandler.error(res);
  }
};

const updateInfo = async (req, res) => {
  try {
    let userData = {};
    const updatedAccount = await accountModel.findOneAndUpdate(
      { _id: req.account.id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedAccount)
      return responseHandler.error(res, "Update information account error !");

    if (
      req.account.role === ROLES_LIST.photographer &&
      req.body.location != null
    ) {
      userData = await photographerModel.findOneAndUpdate(
        { account: req.account.id },
        {
          $set: {
            location: req.body.location,
            gender: req.body.gender,
            age: req.body.age,
            description: req.body.description,
            experienceYears: req.body.experienceYears,
          },
        },
        { new: true }
      );
      if (!userData)
        return responseHandler.error(res, "Update information account error !");
    }

    return responseHandler.ok(res, { ...updatedAccount.toObject(), userData });
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signup,
  login,
  updatePassword,
  getInfo,
  updateInfo,
  isNewQuarterPhotographer,
};
