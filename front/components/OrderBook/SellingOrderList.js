import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

const SellingOrderList = () => {
  const { sellingOrder } = useSelector(state => state.order.orderList);
  const { selectedToken } = useSelector(state => state.tokens);

  return (
    <Table
      dataSource={sellingOrder}
      size='middle'
      pagination={{ pageSize: 5, hideOnSinglePage: true }}
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

export default SellingOrderList;
