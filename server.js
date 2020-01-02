const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const host = dev ? 'localhost' : '0.0.0.0';
const port = process.env.PORT || 3020;

const next = require('next');
const app = next({ dev });
const fastify = require('fastify');

app.prepare().then(() => {
  const server = fastify({
    logger: { level: dev ? 'info' : 'warn' },
  });

  server
    .register(require('fastify-static'), {
      root: path.join(__dirname, 'static'),
      prefix: '/static/',
    })
    .addHook('onClose', (instance, done) => {
      app.close();
      done();
    });

  server.get('/', (req, reply) => {
    reply.redirect('/IDA');
  });
  server.get('/:symbol', (req, reply) => {
    const symbol = req.params.symbol.toUpperCase();
    app.render(req.req, reply.res, '/', { symbol });
  });
  server.get('*', (req, reply) => {
    return app.handleRequest(req.req, reply.res).then(() => {
      reply.sent = true;
    });
  });

  server.listen(port, host, err => {
    if (err) throw err;
    console.log(`Next, Fastify server listenging on port: ${port}`);
  });
});
