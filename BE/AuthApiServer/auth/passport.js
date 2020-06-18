const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const config = require('../../config.json');
const auth = require('./index');
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
			callbackURL: 'http://ec2-15-165-15-61.ap-northeast-2.compute.amazonaws.com:3000/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			process.nextTick(function() {
				user = profile;
				return done(null, profile);
			});
		}
	)
);

const setup = function(app) {
	app.use(
		session({
			secret: 'keyboard cat',
			saveUninitialized: true,
			resave: true
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.get(
		'/auth/auth/google',
		passport.authenticate('google', {
			scope: [ 'email', 'profile', 'openid' ]
		}),
		function(req, res) {
			// The request will be redirected to Google for authentication, so this
			// function will not be called.
			// res.send('hello');
		}
	);

	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/fail' }), function(req, res) {
		req.session.save(() => {
			res.redirect('http://ec2-15-165-15-61.ap-northeast-2.compute.amazonaws.com:8080/chattingroom');
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});
	app.get('/fail', (req, res) => {
		res.json('fail');
	});
	app.get('/', (req, res) => {
		res.redirect('http://ec2-15-165-15-61.ap-northeast-2.compute.amazonaws.com:8080/chattingroom');
	});

	app.get('/auth/account', auth.ensureAuthenticated, (req, res) => {
		const account = {
			name: req.user._json.name,
			picture: req.user._json.picture,
			email: req.user._json.email
		};
		res.json(account);
	});
};

exports.setup = setup;
