const router = require('express').Router();

router.get('/:symbol', (req, res, next) => {
  return res.json([
    {
      type: 'sell',
      maker_address: 'hxaaa',
      token_get: '',
      get_amount: 5,
      token_give: 'cxaaa',
      give_amount: 1,
      order_fills: 0,
    },
    {
      type: 'sell',
      maker_address: 'hxaaa',
      token_get: '',
      get_amount: 5,
      token_give: 'cxaaa',
      give_amount: 2,
      order_fills: 0,
    },
    {
      type: 'buy',
      maker_address: 'hxaaa',
      token_get: 'cxaaa',
      get_amount: 5,
      token_give: '',
      give_amount: 1,
      order_fills: 0,
    },
    {
      type: 'buy',
      maker_address: 'hxaaa',
      token_get: 'cxaaa',
      get_amount: 5,
      token_give: '',
      give_amount: 2,
      order_fills: 0,
    },
  ]);
});

module.exports = router;
