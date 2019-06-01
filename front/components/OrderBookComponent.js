import React from 'react';
import { Table } from 'antd';

const OrderBook = () => {
  return (
    <>
      <Table
        dataSource={orderBook}
        size='middle'
        pagination={{ pageSize: 5, hideOnSinglePage: true }}
        rowKey='symbol'
      >
        <Table.Column
          title='symbol'
          dataIndex='symbol'
          key='symbol'
          width={'25%'}
        />
        <Table.Column
          title='price'
          dataIndex='price'
          key='price'
          width={'25%'}
        />
        <Table.Column
          title='amount'
          dataIndex='amount'
          key='amount'
          width={'25%'}
        />
        <Table.Column
          title='sum'
          key='sum'
          render={text => text.price * text.amount}
          width={'25%'}
        />
      </Table>
    </>
  );
};

export default OrderBook;
