import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';
import { CHANGE_TOKEN } from '../reducers/tokens';

const TokenList = memo(({ list, searchText }) => {
  const dispatch = useDispatch();

  const setList = () => {
    return list.filter(i => {
      if (searchText) {
        return (
          i.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
          i.name.toLowerCase().includes(searchText.toLowerCase())
        );
      } else {
        return i;
      }
    });
  };

  const onRow = row => {
    return {
      onClick() {
        dispatch({
          type: CHANGE_TOKEN,
          token: row,
        });
      },
    };
  };

  return (
    <Table dataSource={setList()} rowKey='id' onRow={onRow}>
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
