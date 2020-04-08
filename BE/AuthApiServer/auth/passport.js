const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const config = require('./config.json');

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
			// async verification
			process.nextTick(function() {
				return done(null, profile);
			});
		}
	)
);

const setup = function(app) {
	app.use(session({ secret: 'keyboard cat' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.get(
		'/auth/google',
		passport.authenticate('google', { scope: [ 'openid', 'email' ] }, function(req, res) {
			/*
        The request will be redirected to Google for authentication
        function will not be called.
     */
		})
	);
	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
		console.log(req.query);
		res.redirect('/');
	});
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/login');
	});
};

exports.setup = setup;
