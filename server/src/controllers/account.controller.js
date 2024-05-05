import jsonwebtoken from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';
import accountModel from '../models/account.model.js';
import { ROLES_LIST, PHOTOGRAPHER_STATUS } from '../configs/enum.config.js';
import customerModel from '../models/customer.model.js';
import photographerModel from '../models/photographer.model.js';

const signup = async (req, res) => {
     try {
          const { username, displayName, password, role, phoneNumber, email } = req.body;

          const isExisted = await accountModel.findOne({ username });

          if (isExisted) return responseHandler.badRequest(res, "Account already exists!");

          const account = new accountModel({
               username,
               displayName,
               email,
               phoneNumber,
               role: role === ROLES_LIST.photographer ? ROLES_LIST.photographer : ROLES_LIST.customer
          });
          account.setPassword(password);
          await account.save();

          if(role === ROLES_LIST.photographer) {
               const { location } = req.body;
               const photographer = new photographerModel({
                    account: account.id,
                    status: PHOTOGRAPHER_STATUS.available,
                    location: location,
               });
               await photographer.save();
          } else {
               const customer = new customerModel({
                    account: account.id,
               });
               await customer.save();
          }

          const token = jsonwebtoken.sign(
               { data: account.id },
               process.env.TOKEN_SECRET_KEY,
               { expiresIn: "6h" }
          );

          account.password = undefined;
          account.salt = undefined;

          responseHandler.created(res, {
               token,
               ...account._doc,
          });
     } catch (error) {
          console.error(error);
          responseHandler.error(res);
     }
};


const login = async (req, res) => {
     try {
          const { username, password } = req.body;
          const userData = {};

          const account = await accountModel.findOne({ username })
               .select("id username displayName password salt phoneNumber email role avatar");


          if (account.role === ROLES_LIST.photographer) {
               const photographer = await photographerModel.findOne({ account: account.id })
                    .select("location status gender age description experienceYears bookingCount");
               userData.location = photographer.location;
               userData.status = photographer.status;
               userData.gender = photographer.gender;
               userData.age = photographer.age;
               userData.description = photographer.description;
               userData.experienceYears = photographer.experienceYears;
               userData.bookingCount = photographer.bookingCount;

          }

          if (account == null) return responseHandler.notfound(res, "Account not found !");

          if (!account.validatePassword(password)) return responseHandler.badRequest(res, "Wrong password !");

          const token = jsonwebtoken.sign(
               { data: account.id },
               process.env.TOKEN_SECRET_KEY,
               { expiresIn: '6h' }
          );

          account.password = undefined;
          account.salt = undefined;
          userData.token = token;

          responseHandler.created(res, {
               token,
               ...account._doc,
               userData,
               id: account.id
          });
     } catch {
          responseHandler.error(res);
     }
};


const updatePassword = async (req, res) => {
     try {
          const { password, newPassword } = req.body;
          const account = await accountModel.findById(req.account.id).select("id password salt");

          if (!account) return responseHandler.unAuthorize(res);

          if (!account.validatePassword(password)) return responseHandler.badRequest(res, "Wrong password !");

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
               userInfo = await customerModel.findOne({ account: req.account.id }).populate("account");
          } else {
               userInfo = await photographerModel.findOne({ account: req.account.id }).populate("account");

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

          if (!updatedAccount) return responseHandler.error(res, "Update information account error !");

          if (req.account.role === ROLES_LIST.photographer && req.body.location != null) {
               userData = await photographerModel.findOneAndUpdate(
                    { account: req.account.id },
                    {
                         $set: {
                              location: req.body.location,
                              gender: req.body.gender ,
                              age: req.body.age,
                              description: req.body.description,
                              experienceYears: req.body.experienceYears
                         }
                    },
                    { new: true }
               );
               if (!userData) return responseHandler.error(res, "Update information account error !");
          }

          return responseHandler.ok(res, { ...updatedAccount.toObject(), userData })

     } catch {
          responseHandler.error(res);
     }
}

export default {
     signup, login, updatePassword, getInfo, updateInfo
}