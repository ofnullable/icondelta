const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const next = require('next');
const morgan = require('morgan');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

require('dotenv').config();

app.prepare().then(() => {
  const server = express();

  // server.use('/', express.static('temp'));
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    expressSession({
      name: process.env.EXPRESS_SESSION_NAME,
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    })
  );

  server.get('/:symbol', (req, res) => {
    const symbol = req.params.symbol || 'AC3';
    app.render(req, res, '/', { symbol });
  });

  server.get('*', (req, res) => {
    if (req.url === '/') {
      console.log('server.js', req);
    }
    return handle(req, res);
  });

  const port = 3020;
  server.listen(port, () => {
    console.log(`Next, Express server running on port ${port}!`);
  });
});
