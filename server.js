const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const routeNumber = require('./routes/number');

// middlewareto accept all origin requests
app.use(cors());

// parse all request body into json
app.use(express.json())

// api point entry
app.use('/api', routeNumber);

// starting server on port 5000
app.listen(port, () => { console.log(`server now running live on port ${port}`)});
