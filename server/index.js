const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

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
// app.use('/api/orders', order);

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  const orderSpace = io.of('/orders');
  orderSpace.on('connection', ws => {
    console.log('order socket connected!');

    orderSpace.on('disconnect', () => console.log('socket disconnected.'));
  });

  const tradeSpace = io.of('/trades');
  tradeSpace.on('connection', ws => {
    console.log('trade socket connected!');
    tradeSpace.on('getTrades', param => {
      console.log('get trades', param);
    });
    tradeSpace.on('disconnect', () => console.log('order socket disconnected'));
  });
});

const port = process.env.PORT || 8010;
server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
