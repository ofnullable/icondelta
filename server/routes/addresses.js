const router = require('express').Router();

router.get('/', (req, res, next) => {
  return res.json({ address: req.session.address });
});

router.post('/', (req, res, next) => {
  const address = req.body.address;
  req.session.address = address;
  return res.json({ address: req.session.address });
});

module.exports = router;
