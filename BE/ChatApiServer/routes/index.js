const express = require('express');
const router = express.Router();
const auth = require('../auth');

router.get('/', (req, res, next) => {
	console.log('Test');
});

module.exports = router;
