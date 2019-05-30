import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import { CHANGE_TOKEN_REQUEST } from '../reducers/tokens';

const TokenList = () => {
  const { tokenList } = useSelector(state => state.tokens);
  const dispatch = useDispatch();

  const onRow = row => {
    return {
      onClick() {
        dispatch({
          type: CHANGE_TOKEN_REQUEST,
          token: row,
        });
      },
    };
  };
  return (
    <Table dataSource={tokenList} rowKey='id' onRow={onRow}>
      <Table.Column
        title='symbol'
        dataIndex='symbol'
        key='symbol'
        width={'50%'}
      />
      <Table.Column
        title='currentPrice'
        dataIndex='currentPrice'
        key='currentPrice'
        width={'50%'}
      />
    </Table>
  );
};

export default TokenList;
