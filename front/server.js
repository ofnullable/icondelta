const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { parse } = require('url');
const next = require('next');
const morgan = require('morgan');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

require('dotenv').config();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));

  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    })
  );

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.get('/:symbol', (req, res) => {
    const symbol = req.params.symbol || 'AC3';
    return app.render(req, res, '/index', { symbol });
  });

  server.get('*', (req, res) => {
    const { pathname } = parse(req.url);

    if (pathname === '/') {
      return res.redirect('/AC3');
    }
    return handle(req, res);
  });

  const port = process.env.PORT || 3020;
  server.listen(port, () => {
    console.log(`Next, Express server running on port ${port}!`);
  });
});
