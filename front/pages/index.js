import React, { useEffect } from 'react';
import { Col, Row, PageHeader } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import TradeForm from '../components/TradeForm';
import Balance from '../components/Balance';
import OrderBook from '../components/OrderBook';
import iconexEvent, {
  REQUEST_ADDRESS,
  REQUEST_JSON_RPC,
} from '../utils/events';
import History from '../components/History';
import TokenMenu from '../components/TokenMenu';
import { RESPONSE_ADDRESS, ICONEX_RELAY_RESPONSE } from '../reducers/iconex';

const Home = () => {
  const { selectedToken } = useSelector(state => state.tokens);
  const dispatch = useDispatch();

  useEffect(() => {
    const eventHandler = e => {
      const { type, payload } = e.detail;
      console.log(type, payload);
      switch (type) {
        case RESPONSE_ADDRESS:
          dispatch({
            type,
            payload,
          });
        default:
          break;
      }
    };
    const getAddress = iconexEvent(REQUEST_ADDRESS);
    const getTotalSupply = iconexEvent(REQUEST_JSON_RPC, {
      jsonrpc: '2.0',
      method: 'icx_getTotalSupply',
      id: 6339,
      params: {},
    });

    window.addEventListener(ICONEX_RELAY_RESPONSE, eventHandler);

    // window.dispatchEvent(getAddress);
    window.dispatchEvent(getTotalSupply);
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
        <Col xs={24} md={18} lg={12} style={{ marginTop: '10px' }}>
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
