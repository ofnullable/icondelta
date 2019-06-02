import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import {
  DEPOSIT_ICX_REQUEST,
  WITHDRAW_ICX_REQUEST,
  DEPOSIT_TOKEN_REQUEST,
  WITHDRAW_TOKEN_REQUEST,
} from '../../reducers/iconex';

const BalanceForm = ({ actionType, token }) => {
  const [icxAmount, setIcxAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const { address } = useSelector(state => state.iconex);
  const { selectedToken } = useSelector(state => state.tokens);
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
    ({ keyCode }) => {
      if (keyCode) {
        if (keyCode === 13) {
          _dispatchIcxAction();
          setIcxAmount('');
        }
      } else {
        _dispatchIcxAction();
        setIcxAmount('');
      }
    },
    [icxAmount]
  );
  const dispatchTokenEvent = useCallback(
    ({ keyCode }) => {
      if (keyCode) {
        if (keyCode === 13) {
          _dispatchTokenAction();
          setTokenAmount('');
        }
      } else {
        _dispatchTokenAction();
        setTokenAmount('');
      }
    },
    [tokenAmount]
  );

  const _dispatchIcxAction = () => {
    if (actionType === 'Deposit') {
      _depositIcx();
    } else {
      _withdrawIcx();
    }
  };
  const _dispatchTokenAction = () => {
    if (actionType === 'Deposit') {
      _depositToken();
    } else {
      _withdrawToken();
    }
  };

  const _depositIcx = () => {
    dispatch({
      type: DEPOSIT_ICX_REQUEST,
      address,
      amount: icxAmount,
    });
  };
  const _withdrawIcx = () => {
    dispatch({
      type: WITHDRAW_ICX_REQUEST,
      address,
      amount: icxAmount,
    });
  };
  const _depositToken = () => {
    dispatch({
      type: DEPOSIT_TOKEN_REQUEST,
      address,
      tokenAddress: selectedToken.address,
      amount: tokenAmount,
    });
  };
  const _withdrawToken = () => {
    dispatch({
      type: WITHDRAW_TOKEN_REQUEST,
      address,
      tokenAddress: selectedToken.address,
      amount: tokenAmount,
    });
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
            onKeyDown={dispatchIcxEvent}
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
            onKeyDown={dispatchTokenEvent}
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
