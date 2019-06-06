import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Card, List } from 'antd';
import { toIcx } from '../../utils/formatter';
import { TextColoredList } from './index';

const SellingOrderList = memo(() => {
  const { sellingOrders } = useSelector(state => state.order);
  return (
    <TextColoredList
      color='red'
      grid={{ gutter: 0, column: 3 }}
      dataSource={sellingOrders}
      rowKey='hashed_data'
      renderItem={o => {
        const amount = toIcx(o.give_amount - o.order_fill);
        const price = (o.get_amount / o.give_amount).toFixed(9);
        console.log(amount, price, amount * price);
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
});

export default SellingOrderList;
