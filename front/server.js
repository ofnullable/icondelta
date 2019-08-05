const path = require('path');
const fastify = require('fastify')({
  logger: { level: 'info' },
});

fastify
  .register(require('fastify-static'), {
    root: path.join(__dirname, 'static'),
    prefix: '/static/', // optional: default '/'
  })
  .register(require('fastify-nextjs'))
  .after(() => {
    fastify.next('/', (app, req, reply) => {
      reply.redirect('/ST');
    });
    fastify.next('/:symbol', (app, req, reply) => {
      const symbol = req.params.symbol.toUpperCase() || 'ST';
      app.render(req.raw, reply.res, '/', { symbol });
    });
  });

const port = process.env.PORT || 3020;
fastify.listen(port, err => {
  if (err) throw err;
  console.log(`Next, Fastify server listenging on port: ${port}`);
});
