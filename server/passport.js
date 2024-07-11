
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

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
	(request, accessToken, refreshToken, profile, done) => {
		return done(null, profile);
	}
	)
);


export default passport;