const express = require('express');
const redis = require('redis');
const store = redis.createClient(6379, {
	host: 'redis'
});
const router = express.Router();
let app = require('../app');
router.post('/api/room', (req, res, next) => {
	const roomNum = req.body.code;
	store.get(roomNum, (err, reply) => {
		if (reply !== null) {
			res.json({ result: 'success' });
		} else {
			res.json({ result: 'fail' });
		}
	});
});

module.exports = router;
