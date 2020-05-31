const express = require('express');
const redis = require('redis');
const store = redis.createClient(6379, 'localhost');
const router = express.Router();
let app = require('../app');
router.get('/', (req, res, next) => {});
router.post('/room', (req, res, next) => {
	const roomNum = req.body.code;
	console.log(roomNum);
	store.get(roomNum, (err, reply) => {
		if (reply !== null) {
			res.json({ result: 'success' });
		} else {
			res.json({ result: 'fail' });
		}
	});
});

module.exports = router;
