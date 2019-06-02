import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Table } from 'antd';

export default () => {
  const { orderBook } = useSelector(state => state.order);
  const { tradeHistory } = useSelector(state => state.trade);
  const [data, setData] = useState(orderBook);

  const handleMenuClick = useCallback(
    e => {
      setData(e.key === 'order' ? orderBook : tradeHistory);
    },
    [data]
  );

  const createdAt = data => {
    return data.orderedAt ? data.orderedAt : data.tradedAt;
  };

  return (
    <>
      <Menu
        style={{ marginTop: '10px' }}
        mode='horizontal'
        onClick={handleMenuClick}
        defaultSelectedKeys={['order']}
      >
        <Menu.Item key='order'>History</Menu.Item>
        {/*<Menu.Item key='trade' style={{ width: '50%' }}>
          My Trade History
  </Menu.Item>*/}
      </Menu>
      <Table dataSource={data} rowKey='total' pagination={{ pageSize: 10 }}>
        <Table.Column
          title='createdAt'
          key='createdAt'
          render={data => createdAt(data)}
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
