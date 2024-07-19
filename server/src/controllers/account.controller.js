import responseHandler from "../handlers/response.handler.js";
import accountModel from "../models/account.model.js";
import { ROLES_LIST, PHOTOGRAPHER_STATUS } from "../configs/enum.config.js";
import customerModel from "../models/customer.model.js";
import photographerModel from "../models/photographer.model.js";
import { createToken } from "../utils/token.util.js";
import customerController from "../controllers/customer.controller.js";
import bookingModel from "../models/booking.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { username, displayName, password, role, phoneNumber, email } = req.body;


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
      userData: {
        account: {
          ...account._doc,
        },
        ...photographer,
      }
    });
  } catch (error) {
    console.error(error);
    responseHandler.error(res, error.message);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let userData = {};
    const account = await accountModel
      .findOne({ username })
      .select(
        "id username displayName password salt phoneNumber email role avatar"
      );

    if (account.role === ROLES_LIST.photographer) {
      const photographer = await photographerModel
        .findOne({ account: account.id })
        .select(
          "location status gender age description experienceYears bookingCount type_of_account bankName serialNumber"
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

    if (account.role === ROLES_LIST.photographer) {
      userData = await photographerModel
        .findOne({ account: account.id })
        .populate("account", "-password -salt");
    } else {
      userData = await customerModel
        .findOne({ account: account.id })
        .populate("account", "-password -salt");
    }

    const token = createToken(account.id);
    req.account = account;

    responseHandler.created(res, {
      token,
      id: account.id,
      userData,
    });


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
    console.error(error);
    console.error("Error in account.controller.login");
    responseHandler.error(res);
  }
};

const isNewQuarterPhotographer = async (req, res) => {
  try {
    const { account } = req;
    if (account.role === ROLES_LIST.photographer) {
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
    let userData = {};
    if (req.account.role === ROLES_LIST.customer) {
      userData = await customerModel
        .findOne({ account: req.account.id })
        .populate("account");
    } else {
      userData = await photographerModel
        .findOne({ account: req.account.id })
        .populate("account");
    }
    return responseHandler.ok(res, { userData });
  } catch {
    responseHandler.error(res);
  }
};


const updateInfo = async (req, res) => {
  try {
    let photographerData = {};

    const updatedAccount = await accountModel.findOneAndUpdate(
      { _id: req.account.id },
      { $set: req.body },
      { new: true }
    );

 

    if (!updatedAccount) {
      return responseHandler.error(res, "Update information account error !");
    }

    if (
      req.account.role === ROLES_LIST.photographer &&
      req.body.location != null
    ) {
      const updatedPhotographer = await photographerModel.findOneAndUpdate(
        { account: req.account.id },
        {
          $set: {
            location: req.body.location,
            gender: req.body.gender,
            age: req.body.age,
            description: req.body.description,
            experienceYears: req.body.experienceYears,
            bankName: req.body.bankName,
            serialNumber: req.body.serialNumber,
          },
        },
        { new: true }
      ).select("-account -createdAt -updatedAt -__v");

      if (updatedPhotographer) {
        photographerData = updatedPhotographer.toObject();
      }
    }

    return responseHandler.ok(res, {
      userData: {
        account: updatedAccount._doc,
        ...photographerData,
      }
    });
  } catch (error) {
    console.error(error);
    return responseHandler.error(res);
  }
};


const gglogin = async (req, res) => {
  try {
    const user = req.user;
    const account = await accountModel.findOne({ email: user.email }).select(
      "id username displayName password salt phoneNumber email role avatar"
    );

    if (account) {
      account.password = undefined;
      account.salt = undefined;
    } else {
      const account = new accountModel({
        username: user.email,
        displayName: user.displayName,
        email: user.email,
        avatar: user.picture,
        role: ROLES_LIST.customer,
      });
      await account.save();
      const customer = new customerModel({
        account: account.id,
      });
      await customer.save();
    }
    const token = createToken(account.id);
    const expirationDate = new Date(Date.now() + 6 * 60 * 60 * 1000);

    console.log("Generated Token:", token);

    res.cookie('jwtToken', token, {
      httpOnly: true,
      expires: expirationDate,
    });

    return res.status(200).redirect("http://localhost:3000/");
  } catch (error) {
    console.error(error);
    responseHandler.error(res);
  }
};


const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const forgotPassword = async (req, res) => {
  try {
    const user = await accountModel.findOne({ email: req.body.email });
    if (!user) {
      return responseHandler.notfound(res, "Email không tồn tại !");
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1h",
    });
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${'http://localhost:3000' || process.env.CLIENT_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Failed to send password reset email:", err);
    responseHandler.error(res);
  }
};
const resetPassword = async (req, res) => {
  try {
    const token = req.body.token;
    // console.log(token);
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    const user = await accountModel.findOne({
      _id: decodedToken.id,
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return responseHandler.unAuthorize(
        res,
        "Token không hợp lệ hoặc đã hết hạn !"
      );
    }
    user.setPassword(req.body.password);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: "Password Reset Confirmation",
      html: `
      <p>Your password has been successfully reset. If you did not initiate this request, please contact us immediately.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Failed to reset password:", err);
    responseHandler.error(res);
  }
};
const getResetPasswordPage = async (req, res) => {
  try {
    res.json({
      message: "Please enter a new password",
      token: req.query.token,
    });
  } catch (error) {
    console.error("Error in account.controller.getResetPasswordPage", error);
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
  gglogin,
  forgotPassword,
  resetPassword,
  getResetPasswordPage,
};
