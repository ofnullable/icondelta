import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

const UserBalance = ({ token }) => {
  const { icxBalance, tokenBalance } = useSelector(state => state.iconex);
  const tableData = [
    {
      name: 'ICX',
      wallet: icxBalance,
      icondelta: 0,
    },
    {
      name: token.symbol,
      wallet: tokenBalance,
      icondelta: 0,
    },
  ];
  return (
    <Table
      size='middle'
      style={{ padding: '0' }}
      pagination={false}
      dataSource={tableData}
      rowKey='name'
    >
      <Table.Column title='name' dataIndex='name' key='name' width={'34%'} />
      <Table.Column
        title='wallet'
        dataIndex='wallet'
        key='wallet'
        width={'33%'}
      />
      <Table.Column
        title='icondelta'
        dataIndex='icondelta'
        key='icondelta'
        width={'33%'}
      />
    </Table>
  );
};

export default UserBalance;
