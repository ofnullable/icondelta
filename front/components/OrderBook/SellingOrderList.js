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
      renderItem={item => {
        const amount = toIcx(item.give_amount - item.order_fill);
        const price = (item.get_amount / item.give_amount).toFixed(9);
        return (
          <>
            <List.Item>
              <Card>{amount}</Card>
            </List.Item>
            <List.Item>
              <Card>{price}</Card>
            </List.Item>
            <List.Item>
              <Card>{(amount * price).toFixed(9)}</Card>
            </List.Item>
          </>
        );
      }}
    />
  );
};

export default SellingOrderList;
