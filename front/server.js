const path = require('path');

const fastify = require('fastify')({
  logger: { level: 'info' },
});

const port = process.env.PORT || 3020;
const dev = process.env.NODE_ENV !== 'production';

fastify
  .register(require('fastify-static'), {
    root: path.join(__dirname, 'static'),
    prefix: '/static/', // optional: default '/'
  })
  .register(require('fastify-nextjs'), { dev })

  .after(() => {
    fastify.next('/', async (app, req, reply) => {
      reply.redirect('/ST');
    });
    fastify.next('/:symbol', async (app, req, reply) => {
      const symbol = req.params.symbol.toUpperCase() || 'ST';
      app.render(req.raw, reply.res, '/', { symbol });
    });
  });

fastify.listen(port, '0.0.0.0', err => {
  if (err) throw err;
  console.log(`Next, Fastify server listenging on port: ${port}`);
});
