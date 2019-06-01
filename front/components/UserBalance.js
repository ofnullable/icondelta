import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Icon, Typography } from 'antd';

const UserBalance = () => {
  const { address } = useSelector(state => state.iconex);

  const inputLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  return (
    <Form {...inputLayout}>
      <Typography>{address}</Typography>
      <Form.Item label='diposit' style={{ margin: '0' }}>
        <Input
          prefix={<Icon type='safety' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='amount'
        />
      </Form.Item>
    </Form>
  );
};

export default UserBalance;
