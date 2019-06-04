import React from 'react';
import { useSelector } from 'react-redux';
import { Card, List } from 'antd';
import { toIcx } from '../../utils/formatter';
import { TextColoredList } from './index';

const SellingOrderList = () => {
  const { sellingOrders } = useSelector(state => state.order);
  return (
    <TextColoredList
      color='red'
      grid={{ gutter: 0, column: 3 }}
      dataSource={sellingOrders}
      rowKey='hashed_data'
      renderItem={item => (
        <>
          <List.Item>
            <Card>{toIcx(item.give_amount)}</Card>
          </List.Item>
          <List.Item>
            <Card>{(item.get_amount / item.give_amount).toFixed(9)}</Card>
          </List.Item>
          <List.Item>
            <Card>{toIcx(item.get_amount).toFixed(9)}</Card>
          </List.Item>
        </>
      )}
    />
  );
};

export default SellingOrderList;
