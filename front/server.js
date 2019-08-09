const path = require('path');

const port = process.env.PORT || 3020;
const dev = process.env.NODE_ENV !== 'production';
const host = dev ? 'localhost' : '0.0.0.0';

const fastify = require('fastify')({
  logger: { level: dev ? 'info' : 'warn' },
});

fastify
  .register(require('fastify-static'), {
    root: path.join(__dirname, 'static'),
    prefix: '/static/', // optional: default '/'
  })
  .register(require('fastify-nextjs'), { dev })
  .after(() => {
    console.log(fastify.next);
    fastify.next('/', async (app, req, reply) => {
      return reply.redirect('/IDA');
    });
    fastify.next('/:symbol', async (app, req, reply) => {
      const symbol = req.params.symbol.toUpperCase();
      return app.render(req.raw, reply.res, '/', { symbol });
    });
  });

fastify.listen(port, host, err => {
  if (err) throw err;
  console.log(`Next, Fastify server listenging on port: ${port}`);
});
