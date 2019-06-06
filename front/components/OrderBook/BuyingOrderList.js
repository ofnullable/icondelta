import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { List, Card } from 'antd';
import { toIcx } from '../../utils/formatter';
import { TextColoredList } from './index';

const BuyingOrderList = memo(() => {
  const buyingOrders = useSelector(state => state.order.buyingOrders);
  return (
    <TextColoredList
      color='royalblue'
      grid={{ gutter: 0, column: 3 }}
      dataSource={buyingOrders}
      rowKey='hashed_data'
      renderItem={o => {
        const amount = toIcx(o.get_amount - o.order_fill);
        const price = (o.give_amount / o.get_amount).toFixed(9);
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

export default BuyingOrderList;
