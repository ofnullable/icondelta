import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

export default () => {
  const { orderBook } = useSelector(state => state.order);
  const { selectedToken } = useSelector(state => state.tokens);
  return (
    <Table
      dataSource={orderBook}
      size='middle'
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
      rowKey='symbol'
    >
      <Table.Column
        title='amount'
        key='amount'
        dataIndex='amount'
        width={'25%'}
      />
      <Table.Column
        title={`${selectedToken.symbol}/ICX`}
        key='price'
        dataIndex='price'
        width={'25%'}
      />
      <Table.Column
        title='total'
        key='total'
        render={text => text.price * text.amount}
        width={'25%'}
      />
    </Table>
  );
};
