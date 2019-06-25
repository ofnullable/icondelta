const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    res.json({ app: 'icondelta' });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
