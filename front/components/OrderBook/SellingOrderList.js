import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Card, List } from 'antd';
import { toIcx } from '../../utils/formatter';
import { TextColoredList } from './index';

const SellingOrderList = memo(() => {
  const sellingOrders = useSelector(state => state.order.sellingOrders);
  return (
    <TextColoredList
      color='red'
      grid={{ gutter: 0, column: 3 }}
      dataSource={sellingOrders}
      rowKey='hashed_data'
      renderItem={o => {
        const price = (o.get_amount - o.order_fill) / o.give_amount;
        const total = o.get_amount - o.order_fill;
        const amount = toIcx(total / price);
        return (
          <>
            <List.Item>
              <Card>{amount}</Card>
            </List.Item>
            <List.Item>
              <Card>{price.toFixed(9)}</Card>
            </List.Item>
            <List.Item>
              <Card>{toIcx(total).toFixed(9)}</Card>
            </List.Item>
          </>
        );
      }}
    />
  );
});

export default SellingOrderList;
