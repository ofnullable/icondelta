import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';
import { CHANGE_TOKEN } from '../reducers/tokens';
import { LOAD_ORDERBOOK_REQUEST } from '../reducers/order';
import { LOAD_TRADE_HISTORY_REQUEST } from '../reducers/trade';

const TokenList = memo(({ list, searchText }) => {
  const dispatch = useDispatch();

  const setList = () => {
    if (searchText) {
      return list.filter(
        i =>
          i.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
          i.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      return list;
    }
  };

  const onRow = token => {
    return {
      onClick() {
        dispatch({
          type: CHANGE_TOKEN,
          token,
        });
        dispatch({
          type: LOAD_ORDERBOOK_REQUEST,
          token,
        });
        dispatch({
          type: LOAD_TRADE_HISTORY_REQUEST,
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
      <Table.Column title='name' dataIndex='name' key='name' width={'33%'} />
      <Table.Column
        title='symbol'
        dataIndex='symbol'
        key='symbol'
        width={'33%'}
      />
      <Table.Column
        title='currentPrice'
        dataIndex='currentPrice'
        key='currentPrice'
        width={'34%'}
      />
    </Table>
  );
});

export default TokenList;
