import React, { useEffect } from 'react';
import { Col, Row, PageHeader } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import TradeForm from '../components/TradeForm';
import Balance from '../components/Balance';
import OrderBook from '../components/OrderBook';
import iconexEvent, { REQUEST_ADDRESS } from '../utils/events';
import History from '../components/History';
import TokenMenu from '../components/TokenMenu';
import {
  RESPONSE_ADDRESS,
  ICONEX_RELAY_RESPONSE,
  RESPONSE_JSON_RPC,
} from '../reducers/iconex';

const Home = () => {
  const { selectedToken } = useSelector(state => state.tokens);
  const { address, icxRequestId, tokenRequestId } = useSelector(
    state => state.iconex
  );
  const dispatch = useDispatch();

  // didMount
  useEffect(() => {
    console.log('address', address, !!address);
    const eventHandler = e => {
      const { type, payload } = e.detail;
      console.log('type:', type, payload, e.detail);
      dispatch({
        type,
        payload,
        tokenAddress: selectedToken.address,
      });
      console.log(
        'is icx request',
        icxRequestId === payload.id,
        'is token request',
        tokenRequestId === payload.id
      );
    };
    const getAddress = iconexEvent(REQUEST_ADDRESS);

    window.addEventListener(ICONEX_RELAY_RESPONSE, eventHandler);

    if (!address) {
      window.dispatchEvent(getAddress);
    }
    return () => {
      console.log('unmount component');
      window.removeEventListener(ICONEX_RELAY_RESPONSE, eventHandler);
    };
  }, []);

  return (
    <div>
      <Row gutter={8} style={{ margin: 0 }}>
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
        <Col xs={24} md={12} lg={12} style={{ marginTop: '10px' }}>
          <PageHeader
            title={selectedToken.symbol}
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
              <TokenMenu />
            </Col>
          </Row>
        </Col>
      </Row>
      {/*<Row gutter={8} style={{ margin: 0 }}>
        <Col xs={0} md={0} lg={1} />
        <Col xs={24} md={6} lg={6}>
          <TokenMenu />
        </Col>
        <Col xs={24} md={18} lg={16}>
          <Row gutter={8} style={{ margin: 0 }}>
            <History />
          </Row>
        </Col>
        <Col xs={0} md={0} lg={1} />
          </Row>*/}
    </div>
  );
};

Home.getIntitalProps = async context => {
  console.log('Home getInitailProps:', context);
};

export default Home;
