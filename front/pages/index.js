import React, { useEffect } from 'react';
import { Col, Row, PageHeader } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import TradeForm from '../components/TradeForm';
import Balance from '../components/Balance';
import OrderBook from '../components/OrderBook';
import { getAddress } from '../utils/events';
import History from '../components/History';
import TokenBar from '../components/TokenBar';
import { ICONEX_RELAY_RESPONSE, RESPONSE_JSON_RPC } from '../reducers/iconex';

const Home = () => {
  const { selectedToken } = useSelector(state => state.tokens);
  const { address, jsonRpcIds } = useSelector(state => state.iconex);
  const dispatch = useDispatch();

  useEffect(() => {
    const eventHandler = e => {
      const { type, payload } = e.detail;

      if (type === RESPONSE_JSON_RPC) {
        dispatch({
          type,
          payload,
        });
        console.log('response for what?', jsonRpcIds[payload.id]);
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
      window.dispatchEvent(getAddress());
    }

    return () => {
      console.log('unmount component');
      window.removeEventListener(ICONEX_RELAY_RESPONSE, eventHandler);
    };
  }, [Object.hasOwnProperty(jsonRpcIds), jsonRpcIds]);

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
              <TokenBar />
            </Col>
          </Row>
        </Col>
        <Col xs={0} md={0} lg={1} />
      </Row>
    </div>
  );
};

Home.getIntitalProps = async context => {
  console.log('Home getInitailProps:', context);
};

export default Home;
