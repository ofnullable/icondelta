const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const hpp = require('hpp');
const helmet = require('helmet');

require('dotenv').config();

// routers
const index = require('./routes/index');

const app = express();
const prod = process.env.NODE_ENV === 'production';

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: 'front-end url',
      credentials: true,
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, // https
      domain: prod && '.front.com',
    },
    name: process.env.EXPRESS_SESSION_NAME,
  })
);

// for request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', index);

app.listen(8000, () => {
  console.log('Server is running on localhost:8000');
});
