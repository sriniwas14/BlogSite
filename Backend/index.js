require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { authChecker } = require('./middlewares/auth');

const app = express();

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use(authChecker)
app.use(express.static('static'))
// Routes
app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))


const db = "mongodb://localhost:27017/blogSiteDb"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))