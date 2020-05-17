const ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/fail');
};

exports.ensureAuthenticated = ensureAuthenticated;
