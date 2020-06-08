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
			callbackURL: 'http://15.165.15.61:3000/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			process.nextTick(function() {
				user = profile;
				return done(null, profile);
			});
			// return done(null, {
			// user: profile,
			// token: accessToken
			// });
			/* 
				req.session.passport 정보 저장.
				done메소드에 전달된 정보가 세션에 저장된다.
				profile을 이요해서 사용자 정보를 DB.
			*/
			// process.nextTick(function() {
			// 	user = profile;
			// 	token = accessToken;
			// 	return done(null, user);
			// });
			// });
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
		// req.session.token = req.user.token;
		// res.cookie('token', req.session.token);
		req.session.save(() => {
			// res.redirect('/');
			res.redirect('http://15.165.15.61:8080/chattingroom');
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
		// if (req.session.token) {
		// res.cookie('token', req.session.token);
		// console.log(req.user);
		res.redirect('http://15.165.15.61:8080/chattingroom');
		// res.json({
		// status: 'session cookie set'
		// });
		// } else {
		// res.cookie('token', '');
		// res.json({
		// status: 'session cookie not set'
		// });
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
