import React from 'react';
import { Col, Row, PageHeader } from 'antd';
import { useSelector } from 'react-redux';

import Balance from '../components/Balance';
import OrderBook from '../components/OrderBook';
import History from '../components/History';
import TokenBar from '../components/TokenBar';
import TradeForm from '../components/TradeForm';

const Home = () => {
  const { selectedToken } = useSelector(state => state.tokens);

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
