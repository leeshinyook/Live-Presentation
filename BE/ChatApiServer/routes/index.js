const express = require('express');
const router = express.Router();
// let  = require('../app');
let app = require('../app');
router.get('/', (req, res, next) => {
	console.log('Test');
	res.json('hello');
});

router.post('/room', (req, res, next) => {
	const roomNum = req.body.room;

	// console.log(app.room.push(1));
	// app.room.push(1);
	// app.room.push(roomNum);

	console.log(req.body.room);
});

module.exports = router;
