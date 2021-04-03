require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(cors())
app.use(bodyParser.json());

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))