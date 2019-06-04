import React from 'react';
import { useSelector } from 'react-redux';
import { List, Card } from 'antd';
import { toIcx } from '../../utils/formatter';
import { TextColoredList } from './index';

const BuyingOrderList = () => {
  const { buyingOrders } = useSelector(state => state.order);
  return (
    <TextColoredList
      color='royalblue'
      grid={{ gutter: 0, column: 3 }}
      dataSource={buyingOrders}
      rowKey='hashed_data'
      renderItem={item => (
        <>
          <List.Item>
            <Card>{toIcx(item.get_amount)}</Card>
          </List.Item>
          <List.Item>
            <Card>{(item.give_amount / item.get_amount).toFixed(9)}</Card>
          </List.Item>
          <List.Item>
            <Card>{toIcx(item.give_amount).toFixed(9)}</Card>
          </List.Item>
        </>
      )}
    />
  );
};

export default BuyingOrderList;
