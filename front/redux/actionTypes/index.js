const actionTypes = {
  // for json rpc return
  ICX_BALANCE_REQUEST_ID: 'ICX_BALANCE_REQUEST_ID',
  TOKEN_BALANCE_REQUEST_ID: 'TOKEN_BALANCE_REQUEST_ID',
  ICX_DEPOSIT_REQUEST_ID: 'ICX_DEPOSIT_REQUEST_ID',
  TOKEN_DEPOSIT_REQUEST_ID: 'TOKEN_DEPOSIT_REQUEST_ID',
  ICX_WITHDRAW_REQUEST_ID: 'ICX_WITHDRAW_REQUEST_ID',
  TOKEN_WITHDRAW_REQUEST_ID: 'TOKEN_WITHDRAW_REQUEST_ID',

  // json rpc requests
  DEPOSITED_ICX_BALANCE_REQUEST_ID: 'DEPOSITED_ICX_BALANCE_REQUEST_ID',
  DEPOSITED_TOKEN_BALANCE_REQUEST_ID: 'DEPOSITED_TOKEN_BALANCE_REQUEST_ID',

  // json rpc respons
  RESPONSE_ADDRESS: 'RESPONSE_ADDRESS',
  RESPONSE_JSON_RPC: 'RESPONSE_JSON-RPC',

  // actions
  ICONEX_RELAY_RESPONSE: 'ICONEX_RELAY_RESPONSE',

  DEPOSITED_ICX_BALANCE_REQUEST: 'DEPOSITED_ICX_BALANCE_REQUEST',
  DEPOSITED_ICX_BALANCE_SUCCESS: 'DEPOSITED_ICX_BALANCE_SUCCESS',

  DEPOSITED_TOKEN_BALANCE_REQUEST: 'DEPOSITED_TOKEN_BALANCE_REQUEST',
  DEPOSITED_TOKEN_BALANCE_SUCCESS: 'DEPOSITED_TOKEN_BALANCE_SUCCESS',

  ICX_BALANCE_REQUEST: 'ICX_BALANCE_REQUEST',
  ICX_BALANCE_SUCCESS: 'ICX_BALANCE_SUCCESS',

  TOKEN_BALANCE_REQUEST: 'TOKEN_BALANCE_REQUEST',
  TOKEN_BALANCE_SUCCESS: 'TOKEN_BALANCE_SUCCESS',

  ICX_DEPOSIT_REQUEST: 'ICX_DEPOSIT_REQUEST',
  ICX_DEPOSIT_SUCCESS: 'ICX_DEPOSIT_SUCCESS',

  TOKEN_DEPOSIT_REQUEST: 'TOKEN_DEPOSIT_REQUEST',
  TOKEN_DEPOSIT_SUCCESS: 'TOKEN_DEPOSIT_SUCCESS',

  ICX_WITHDRAW_REQUEST: 'ICX_WITHDRAW_REQUEST',
  ICX_WITHDRAW_SUCCESS: 'ICX_WITHDRAW_SUCCESS',

  TOKEN_WITHDRAW_REQUEST: 'TOKEN_WITHDRAW_REQUEST',
  TOKEN_WITHDRAW_SUCCESS: 'TOKEN_WITHDRAW_SUCCESS',

  LOAD_BUY_ORDER_REQUEST_ID: 'LOAD_BUY_ORDER_REQUEST_ID',
  LOAD_SELL_ORDER_REQUEST_ID: 'LOAD_SELL_ORDER_REQUEST_ID',
  BUY_ORDER_REQUEST_ID: 'BUY_ORDER_REQUEST_ID',
  SELL_ORDER_REQUEST_ID: 'SELL_ORDER_REQUEST_ID',
  TRADE_ORDER_REQUEST_ID: 'TRADE_ORDER_REQUEST_ID',

  LOAD_BUY_ORDER_REQUEST: 'LOAD_BUY_ORDER_REQUEST',
  LOAD_BUY_ORDER_SUCCESS: 'LOAD_BUY_ORDER_SUCCESS',

  LOAD_SELL_ORDER_REQUEST: 'LOAD_SELL_ORDER_REQUEST',
  LOAD_SELL_ORDER_SUCCESS: 'LOAD_SELL_ORDER_SUCCESS',

  BUY_ORDER_REQUEST: 'BUY_ORDER_REQUEST',
  BUY_ORDER_SUCCESS: 'BUY_ORDER_SUCCESS',

  SELL_ORDER_REQUEST: 'SELL_ORDER_REQUEST',
  SELL_ORDER_SUCCESS: 'SELL_ORDER_SUCCESS',

  TRADE_ORDER_REQUEST: 'TRADE_ORDER_REQUEST',
  TRADE_ORDER_SUCCESS: 'TRADE_ORDER_SUCCESS',

  CHANGE_TOKEN: 'TOKEN/CHANGE_TOKEN',
};

export default actionTypes;
