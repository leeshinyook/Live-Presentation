const express = require('express');
const router = express.Router();
const auth = require('../auth');

// router.get('/', (req, res, next) => {
// res.render('index', { title: 'Express' });
// });

router.get('/login', (req, res, next) => {
	res.json({ title: 'Login' });
});

// router.get('/account', auth.ensureAuthenticated, (req, res, next) => {
// res.render('account', {
// title: 'Account',
// name: req.user.displayName,
// user: JSON.stringify(req.user)
// });
// });

module.exports = router;
