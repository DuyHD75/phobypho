import accountModel from './src/models/account.model.js'; 
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { ROLES_LIST } from './src/configs/enum.config.js'; 
import { createToken } from './src/utils/token.util.js';
import customerModel from './src/models/customer.model.js';


passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});


passport.use(
	new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID, // Your Credentials here.
		clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Credentials here.
		callbackURL: "http://localhost:5000/api/v1/accounts/google/callback",
		passReqToCallback: true
	},
	async (request, accessToken, refreshToken, profile, done) => {
		try{
			let user = await accountModel.findOne({ email: profile.email });
			if(!user){
				user = await accountModel.create({
					username: profile.email,
					displayName: profile.displayName,
					email: profile.email,
					avatar: profile.picture,
					role: ROLES_LIST.customer,
				});
				await user.save();
				const customer = await customerModel.create({
					account: user._id,
				});
			}
			
			const token = createToken(user._id);
			// const userWithToken = { ...user.toObject(), token };
			const customerDetail = await customerModel.findOne({ account: user._id });
			let finalUser = {
				userData: {
				account: {
					id: user._id,
					username: user.username,
					displayName: user.displayName,
					email: user.email,
					avatar: user.avatar,
					role: user.role,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					phoneNumber: user.phoneNumber,
				},
				accumulated_points: customerDetail.accumulated_points,
				createdAt: customerDetail.createdAt,
				updatedAt: customerDetail.updatedAt,
				id: customerDetail._id,
				vouchers: customerDetail.vouchers,
			},
			token: token,}
			

      request.res.cookie('user', finalUser, { maxAge: 21600000, httpOnly: false });
			return done(null, user);
      
			
		}catch(error){
			return done(error, null);

		}
	}
	)
);


export default passport;