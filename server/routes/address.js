const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const session = req.session;
    const cookie = {};
    console.log(req.sessionID, session);
    if (cookie.address) {
      res.json({ address: cookie.address });
      return;
    }
    return res
      .status(401)
      .json({ status: 401, message: `You didn't sent wallet address!` });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.sessionID, req.session);
    const address = req.body.address;
    const session = req.session;

    session.address = { address };
    req.signedCookies.address = address;

    return res.json({ address });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
