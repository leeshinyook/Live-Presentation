const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const config = require('../../config.json');

const GOOGLE_CLIENT_ID = config.google.clientId;
const GOOGLE_CLIENT_SECRET = config.google.clientSecret;

// store session
passport.serializeUser(function(user, done) {
	done(null, user); // user obj -> passport.deserializeUser
});

// validate session
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/callback'
		},
		function(accessToken, refreshToken, profile, done) {
			/* 
				req.session.passport 정보 저장.
				done메소드에 전달된 정보가 세션에 저장된다.
				profile을 이요해서 사용자 정보를 DB.
			*/
			process.nextTick(function() {
				user = profile;
				return done(null, user);
			});
		}
	)
);

const setup = function(app) {
	app.use(
		session({
			secret: 'keyboard cat',
			resave: true,
			saveUninitialized: true
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.get('/auth/google', passport.authenticate('google', { scope: [ 'openid', 'email' ] }), function(req, res) {
		// The request will be redirected to Google for authentication, so this
		// function will not be called.
	});

	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(
		req,
		res
	) {
		console.log(req.query);
		res.redirect('/');
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});
};

exports.setup = setup;
