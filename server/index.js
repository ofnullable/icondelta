const express = require('express');
const http = require('http');
const ws = require('ws');

const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const hpp = require('hpp');
const helmet = require('helmet');

require('dotenv').config();

// routers
const address = require('./routes/addresses');
const token = require('./routes/tokens');
const order = require('./routes/orders');

const app = express();
const prod = process.env.NODE_ENV === 'production';

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: '.front-end.com',
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
  session({
    name: process.env.EXPRESS_SESSION_NAME,
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, // https
      domain: prod && '.front.com',
    },
  })
);

// for request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/address', address);
app.use('/api/tokens', token);
app.use('/api/orders', order);

const server = http.createServer(app);
const wss = new ws.Server({ server, path: '/ws' });

wss.on('connection', ws => {
  console.log('connected');
  ws.send('hi, this is ws server');

  ws.on('message', msg => {
    console.log(JSON.parse(msg));
  });
});

const port = process.env.PORT || 8010;
server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
