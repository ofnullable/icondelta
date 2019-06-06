import React, { useEffect } from 'react';
import { Col, Row, PageHeader } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import Balance from '../components/Balance';
import OrderBook from '../components/OrderBook';
import History from '../components/History';
import TokenBar from '../components/TokenBar';
import TradeForm from '../components/TradeForm';
import { ICONEX_RELAY_RESPONSE } from '../reducers/iconex';
import {
  LOAD_BUY_ORDER_REQUEST,
  LOAD_SELL_ORDER_REQUEST,
} from '../reducers/order';
import { generateJsonRpcId } from '../utils/jsonrpc';
import {
  getBuyOrderListEvent,
  getSellOrderListEvent,
  getAddressEvent,
} from '../utils/events';

const Home = () => {
  const { address } = useSelector(state => state.iconex);
  const { selectedToken } = useSelector(state => state.tokens);
  const dispatch = useDispatch();

  useEffect(() => {
    const eventHandler = e => {
      const { type, payload } = e.detail;
      dispatch({
        type,
        payload,
      });
    };

    window.addEventListener(ICONEX_RELAY_RESPONSE, eventHandler);
    return () => {
      window.removeEventListener(ICONEX_RELAY_RESPONSE, eventHandler);
    };
  }, []);

  useEffect(() => {
    window.onload = () => {
      if (!address) {
        window.dispatchEvent(getAddressEvent());
      }

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
    };
  }, [selectedToken]);

  const _requestOrderList = () => {
    const buyId = generateJsonRpcId();
    const buyEvent = getBuyOrderListEvent(buyId);

    const sellId = generateJsonRpcId();
    const sellEvent = getSellOrderListEvent(sellId);

    window.dispatchEvent(buyEvent);
    window.dispatchEvent(sellEvent);

    return [buyId, sellId];
  };

  return (
    <div>
      <Row gutter={8} style={{ margin: 0 }}>
        <Col xs={0} md={0} lg={1} />
        <Col xs={24} md={6} lg={6} style={{ marginTop: '10px' }}>
          <Row>
            <Col>
              <Balance />
            </Col>
            <Col style={{ marginTop: '10px' }}>
              <TradeForm />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={12} lg={10} style={{ marginTop: '10px' }}>
          <PageHeader
            title={`Order Book - ${selectedToken.symbol}`}
            subTitle={`${selectedToken.symbol}/ICX - ${
              selectedToken.currentPrice
            }`}
          />
          <Row gutter={8} style={{ margin: 0 }}>
            <Col xs={24} md={24} lg={24}>
              <OrderBook />
            </Col>
            <Col xs={24} style={{ marginTop: '10px' }} />
            <Col xs={24} style={{ marginTop: '10px' }}>
              <History />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={6} lg={6} style={{ marginTop: '10px' }}>
          <Row gutter={8} style={{ margin: 0 }}>
            <Col xs={24}>
              <TokenBar />
            </Col>
          </Row>
        </Col>
        <Col xs={0} md={0} lg={1} />
      </Row>
    </div>
  );
};

export default Home;
