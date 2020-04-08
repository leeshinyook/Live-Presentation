const express = require('express');
const app = express();

// passport settings
require('./auth/passport').setup(app);
// routing
app.use('/', require('./routes/index'));
app.use('/', require('./routes/index'));
