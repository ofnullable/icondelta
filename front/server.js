const express = require('express');
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

  server.get('/:symbol', (req, res) => {
    const symbol = req.params.symbol || 'AC3';
    const page = '/';
    app.render(req, res, page, { symbol });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = 3020;
  server.listen(port, () => {
    console.log(`Next, Express server running on port ${port}!`);
  });
});
