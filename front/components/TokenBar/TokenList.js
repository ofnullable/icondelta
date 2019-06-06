import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { CHANGE_TOKEN } from '../../reducers/tokens';

const TokenList = ({ searchText }) => {
  const { address } = useSelector(state => state.iconex);
  const { tokenList } = useSelector(state => state.tokens);
  const dispatch = useDispatch();

  const setList = () => {
    if (searchText) {
      return tokenList.filter(
        i =>
          i.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
          i.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      return tokenList;
    }
  };

  const onRow = token => {
    return {
      onClick() {
        dispatch({
          type: CHANGE_TOKEN,
          address,
          token,
        });
      },
    };
  };

  return (
    <Table
      dataSource={setList()}
      rowKey='address'
      onRow={onRow}
      pagination={{ pageSize: 10 }}
    >
      <Table.Column title='Name' dataIndex='name' key='name' width={'33%'} />
      <Table.Column
        title='Symbol'
        dataIndex='symbol'
        key='symbol'
        width={'33%'}
      />
      <Table.Column
        title='Current Price'
        dataIndex='currentPrice'
        key='currentPrice'
        width={'34%'}
      />
    </Table>
  );
};

export default TokenList;
