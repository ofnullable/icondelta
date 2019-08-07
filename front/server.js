const path = require('path');

const fastify = require('fastify')({
  logger: { level: 'info' },
});

const port = process.env.PORT || 3020;
const dev = process.env.NODE_ENV !== 'production';
const host = dev ? 'localhost' : '0.0.0.0';

fastify
  .register(require('fastify-nextjs'))
  .register(require('fastify-static'), {
    root: path.join(__dirname, 'static'),
    prefix: '/static/', // optional: default '/'
  })
  .after(() => {
    fastify.next('/', async (app, req, reply) => {
      return reply.redirect('/ST');
    });
    fastify.next('/:symbol', async (app, req, reply) => {
      const symbol = req.params.symbol.toUpperCase() || 'ST';
      return app.render(req.raw, reply.res, '/', { symbol });
    });
  });

fastify.listen(port, host, err => {
  if (err) throw err;
  console.log(`Next, Fastify server listenging on port: ${port}`);
});
