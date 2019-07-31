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

const orderSpace = io.of('/orders');
orderSpace.on('connect', ws => {
  console.log('order socket connected!');
  ws.on('order_event', (param, cb) => {
    console.log('get orders', param);
    if (param.event === 'getOrders') {
      switch (param.params.type) {
        case 'buy':
          return cb({
            data: [
              {
                signature: 'asdf',
                tokenGet: 'cx~',
                getAmount: 10 * 10 ** 18,
                tokenGive: 'cx~',
                giveAmount: 11 * 10 ** 18,
                nonce: 0,
                makerAddress: 'hx~',
                orderFills: 0,
                expireBlock: 10,
                orderDate: 20190720,
              },
            ],
          });
        case 'sell':
          return cb({
            data: [
              {
                signature: '1asdf',
                tokenGet: 'cx~',
                getAmount: 20 * 10 ** 18,
                tokenGive: 'cx~',
                giveAmount: 10 * 10 ** 18,
                nonce: 0,
                makerAddress: 'hx~',
                orderFills: 0,
                expireBlock: 10,
                orderDate: 20190720,
              },
            ],
          });
        default:
          return;
      }
    }
  });
  setTimeout(() => {
    ws.emit('order_event', {
      action: 'create',
      type: 'buy',
      data: {
        signature: '0xasdf',
        tokenGet: 'cx~',
        getAmount: 10 * 10 ** 18,
        tokenGive: 'cx~',
        giveAmount: 15 * 10 ** 18,
        nonce: 0,
        makerAddress: 'hx~',
        orderFills: 0,
        expireBlock: 10,
        orderDate: 20190720,
      },
    });
  }, 1500);

  setTimeout(() => {
    ws.emit('order_event', {
      action: 'update',
      type: 'buy',
      data: {
        signature: '0xasdf',
        tokenGet: 'cx~',
        getAmount: 10 * 10 ** 18,
        tokenGive: 'cx~',
        giveAmount: 15 * 10 ** 18,
        nonce: 0,
        makerAddress: 'hx~',
        orderFills: 5 * 10 ** 18,
        expireBlock: 10,
        orderDate: 20190720,
      },
    });
  }, 2500);

  ws.on('disconnect', () => console.log('socket disconnected.'));
});

const tradeSpace = io.of('/trades');
tradeSpace.on('connection', ws => {
  console.log('trade socket connected!');
  ws.on('trade_event', param => {
    console.log('get trades', param);
  });

  ws.on('disconnect', () => console.log('order socket disconnected'));
});

const port = process.env.PORT || 8010;
server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
