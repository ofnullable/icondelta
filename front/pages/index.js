import React, { useEffect } from 'react';
import { Col, Row, Card, Icon, Input, PageHeader } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import TradeForm from '../components/TradeForm';
import UserBalance from '../components/UserBalance';
import OrderBook from '../components/OrderBook';
import { iconexEvent } from '../utils/events';
import TokenList from '../components/TokenList';
import History from '../components/History';

const Home = () => {
  const { selectedToken } = useSelector(state => state.tokens);
  const dispatch = useDispatch();

  useEffect(() => {
    const eventHandler = e => {
      const { type, payload } = e.detail;
      console.log(type, payload);
      switch (type) {
        case 'RESPONSE_ADDRESS':
          dispatch({
            type,
            data: payload,
          });
        default:
          break;
      }
    };
    const getAddress = iconexEvent('REQUEST_ADDRESS');
    const getTotalSupply = iconexEvent('REQUEST_JSON-RPC', {
      jsonrpc: '2.0',
      method: 'icx_getTotalSupply',
      id: 6339,
    });

    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);

    window.dispatchEvent(getAddress);
    window.dispatchEvent(getTotalSupply);
    return () => {
      console.log('unmount component');
      window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    };
  }, []);

  return (
    <div>
      <Row gutter={8} style={{ margin: 0 }}>
        <Col xs={0} md={0} lg={1} />
        <Col xs={24} md={24} lg={22} style={{ marginTop: '10px' }}>
          <UserBalance />
        </Col>
        <Col xs={0} md={0} lg={1} />
      </Row>
      <Row gutter={8} style={{ margin: 0 }}>
        <Col xs={0} md={0} lg={1} />
        <Col xs={24} md={6} lg={6}>
          <Row>
            <Col>
              <Card
                style={{ marginTop: '10px' }}
                actions={[
                  <Icon type='setting' />,
                  <Icon type='edit' />,
                  <Icon type='ellipsis' />,
                ]}
              >
                <Card.Meta
                  title={selectedToken.symbol}
                  description={`${selectedToken.symbol}/ICX`}
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={18} lg={16} style={{ marginTop: '10px' }}>
          <PageHeader
            title={selectedToken.symbol}
            subTitle={`${selectedToken.symbol}/ICX`}
          />
          <Row gutter={8} style={{ margin: 0 }}>
            <Col xs={24} md={12} lg={12} style={{ marginTop: '10px' }}>
              <OrderBook />
            </Col>
            <Col xs={24} md={12} lg={12} style={{ marginTop: '10px' }}>
              <TradeForm />
            </Col>
          </Row>
        </Col>
        <Col xs={0} md={0} lg={1} />
      </Row>
      <Row gutter={8} style={{ margin: 0 }}>
        <Col xs={0} md={0} lg={1} />
        <Col xs={24} md={6} lg={6}>
          <Card
            title={
              <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
            }
            style={{ marginTop: '10px' }}
            bodyStyle={{ padding: '0' }}
          >
            <TokenList />
          </Card>
        </Col>
        <Col xs={24} md={18} lg={16}>
          <Row gutter={8} style={{ margin: 0 }}>
            <History />
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
