require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(cors())
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))


const db = "mongodb://localhost:27017/blogSiteDb"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))