const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const sessionAddress = req.session.address;
    if (sessionAddress) {
      res.json({ address: req.session.address });
      return;
    }
    return res.status(404).json({ status: 404, message: 'Address not found.' });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const address = req.body.address;
    req.session.address = address;
    return res.json({ address });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
