import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Table } from 'antd';

const History = () => {
  const { histories } = useSelector(state => state.tokens);
  const [history, setHistory] = useState(histories.orderHistory);

  const handleMenuClick = useCallback(
    e => {
      setHistory(histories[e.key]);
    },
    [history]
  );

  return (
    <>
      <Menu
        style={{ marginTop: '10px', border: '1px solid #e8e8e8' }}
        mode='horizontal'
        onClick={handleMenuClick}
        defaultSelectedKeys={['orderHistory']}
      >
        <Menu.Item key='orderHistory' style={{ width: '50%' }}>
          OrderHistory
        </Menu.Item>
        <Menu.Item key='tradeHistory' style={{ width: '50%' }}>
          TradeHistory
        </Menu.Item>
      </Menu>
      <Table dataSource={history} rowKey='id' pagination={{ pageSize: 10 }}>
        <Table.Column
          title='createdAt'
          dataIndex='createdAt'
          key={data => data.id}
          width={'20%'}
        />
        <Table.Column title='type' dataIndex='type' key='type' width={'20%'} />
        <Table.Column
          title='price'
          dataIndex='price'
          key='price'
          width={'20%'}
        />
        <Table.Column
          title='amount'
          dataIndex='amount'
          key='amount'
          width={'20%'}
        />
        <Table.Column
          title='total'
          key='total'
          render={item => item.price * item.amount}
          width={'20%'}
        />
      </Table>
    </>
  );
};

export default History;
