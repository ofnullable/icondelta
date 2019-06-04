import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { CHANGE_TOKEN } from '../../reducers/tokens';
import {
  LOAD_BUY_ORDER_REQUEST,
  LOAD_SELL_ORDER_REQUEST,
} from '../../reducers/order';
import {
  getAddressEvent,
  getBuyOrderListEvent,
  getSellOrderListEvent,
} from '../../utils/events';
import {
  RESPONSE_JSON_RPC,
  ICONEX_RELAY_RESPONSE,
} from '../../reducers/iconex';
import { generateJsonRpcId } from '../../utils/jsonrpc';

const TokenList = memo(({ searchText }) => {
  const { selectedToken, tokenList } = useSelector(state => state.tokens);
  const { address, jsonRpcIds } = useSelector(state => state.iconex);
  const { sellingOrders, buyingOrders } = useSelector(state => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    const eventHandler = e => {
      const { type, payload } = e.detail;
      if (type === RESPONSE_JSON_RPC) {
        dispatch({
          type,
          payload,
        });
        // console.log('response for what?', jsonRpcIds[payload.id]);
      } else {
        // RESPONSE_ADDRESS
        dispatch({
          type,
          payload,
          tokenAddress: selectedToken.address,
        });
      }
    };

    window.addEventListener(ICONEX_RELAY_RESPONSE, eventHandler);

    if (!address) {
      window.dispatchEvent(getAddressEvent());
    }
    return () => {
      window.removeEventListener(ICONEX_RELAY_RESPONSE, eventHandler);
    };
  }, [Object.hasOwnProperty(jsonRpcIds), jsonRpcIds]);

  useEffect(() => {
    if (address) {
      const ids = _requestOrderList();
      dispatch({
        type: LOAD_BUY_ORDER_REQUEST,
        id: ids[0],
        token: selectedToken.address,
      });
      dispatch({
        type: LOAD_SELL_ORDER_REQUEST,
        id: ids[1],
        token: selectedToken.address,
      });
    }
  }, [address, selectedToken]);

  const _requestOrderList = () => {
    const buyId = generateJsonRpcId();
    const buyEvent = getBuyOrderListEvent(buyId, address);

    const sellId = generateJsonRpcId();
    const sellEvent = getSellOrderListEvent(sellId, address);

    window.dispatchEvent(buyEvent);
    window.dispatchEvent(sellEvent);

    return [buyId, sellId];
  };

  const setList = () => {
    if (searchText) {
      return tokenList.filter(
        i =>
          i.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
          i.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      return tokenList;
    }
  };

  const onRow = token => {
    return {
      onClick() {
        if (address) {
          dispatch({
            type: CHANGE_TOKEN,
            address,
            token,
          });
          dispatch({
            type: LOAD_BUY_ORDER_REQUEST,
            address,
            tokenAddress: token.address,
          });
          dispatch({
            type: LOAD_SELL_ORDER_REQUEST,
            tokenAddress: token.address,
          });
        } else {
          window.dispatchEvent(getAddressEvent());
        }
      },
    };
  };

  return (
    <Table
      dataSource={setList()}
      rowKey='address'
      onRow={onRow}
      pagination={{ pageSize: 10 }}
    >
      <Table.Column title='Name' dataIndex='name' key='name' width={'33%'} />
      <Table.Column
        title='Symbol'
        dataIndex='symbol'
        key='symbol'
        width={'33%'}
      />
      <Table.Column
        title='Current Price'
        dataIndex='currentPrice'
        key='currentPrice'
        width={'34%'}
      />
    </Table>
  );
});

export default TokenList;
