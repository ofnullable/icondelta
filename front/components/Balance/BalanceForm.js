import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

const BalanceForm = ({ actionType, token }) => {
  const [icxAmount, setIcxAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const dispatch = useDispatch();

  const changeIcxAmount = useCallback(
    e => {
      setIcxAmount(e.target.value);
    },
    [icxAmount]
  );
  const changeTokenAmount = useCallback(
    e => {
      setTokenAmount(e.target.value);
    },
    [tokenAmount]
  );
  const dispatchIcxEvent = useCallback(
    e => {
      setIcxAmount('');
    },
    [icxAmount]
  );
  const dispatchTokenEvent = useCallback(
    e => {
      setTokenAmount('');
      console.log(e);
    },
    [tokenAmount]
  );
  const submitIcxAction = useCallback(
    e => {
      if (e.keyCode === 13) {
        setIcxAmount('');
      }
    },
    [icxAmount]
  );
  const submitTokenAction = useCallback(
    e => {
      if (e.keyCode === 13) {
        setTokenAmount('');
      }
    },
    [tokenAmount]
  );

  const actionRequest = () => {
    if (actionType === 'Deposit') {
      dispatch({});
    } else {
      dispatch({});
    }
  };

  return (
    <div>
      <Form layout={'inline'} style={{ marginTop: '10px' }}>
        <div style={{ marginBottom: '10px' }}>
          <p>{actionType} ICX</p>
          <Input
            type='text'
            style={{ width: '65%', marginRight: '3%' }}
            value={icxAmount}
            onChange={changeIcxAmount}
            onKeyDown={submitIcxAction}
          />
          <Button
            htmlType='button'
            type={actionType === 'Deposit' ? 'primary' : 'danger'}
            style={{ width: '32%' }}
            onClick={dispatchIcxEvent}
          >
            {actionType}
          </Button>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <p>
            {actionType} {token.symbol}
          </p>
          <Input
            type='text'
            style={{ width: '65%', marginRight: '3%' }}
            value={tokenAmount}
            onChange={changeTokenAmount}
            onKeyDown={submitTokenAction}
          />
          <Button
            htmlType='button'
            type={actionType === 'Deposit' ? 'primary' : 'danger'}
            style={{ width: '32%' }}
            onClick={dispatchTokenEvent}
          >
            {actionType}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BalanceForm;
