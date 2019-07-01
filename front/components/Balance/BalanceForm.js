import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import {
  getAddressEvent,
  depositIcxEvent,
  withdrawIcxEvent,
  depositTokenEvent,
  withdrawTokenEvent,
} from '../../utils/events';
import { generateJsonRpcId } from '../../utils/jsonrpc';
import actionTypes from '../../redux/actionTypes';

const BalanceForm = ({ actionType }) => {
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
      if (!address) {
        window.dispatchEvent(getAddressEvent());
        return;
      }
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
    [icxAmount, address, actionType]
  );
  const dispatchTokenEvent = useCallback(
    ({ keyCode }) => {
      if (!address) {
        window.dispatchEvent(getAddressEvent());
        return;
      }
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
    [tokenAmount, address, actionType]
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
    const id = generateJsonRpcId();
    const event = depositIcxEvent(id, address, icxAmount);

    window.dispatchEvent(event);
    dispatch({
      type: actionTypes.ICX_DEPOSIT_REQUEST,
      id,
      icxAmount,
    });
  };

  const _withdrawIcx = () => {
    const id = generateJsonRpcId();
    const event = withdrawIcxEvent(id, address, icxAmount);

    window.dispatchEvent(event);
    dispatch({
      type: actionTypes.ICX_WITHDRAW_REQUEST,
      id,
      icxAmount,
    });
  };

  const _depositToken = () => {
    const id = generateJsonRpcId();
    const event = depositTokenEvent(
      id,
      address,
      selectedToken.address,
      tokenAmount
    );

    window.dispatchEvent(event);
    dispatch({
      type: actionTypes.TOKEN_DEPOSIT_REQUEST,
      id,
      tokenAmount,
    });
  };
  const _withdrawToken = () => {
    const id = generateJsonRpcId();
    const event = withdrawTokenEvent(
      id,
      address,
      selectedToken.address,
      tokenAmount
    );

    window.dispatchEvent(event);
    dispatch({
      type: actionTypes.TOKEN_WITHDRAW_REQUEST,
      id,
      tokenAmount,
    });
  };

  return (
    <div>
      <Form layout={'inline'} style={{ marginTop: '10px' }}>
        <div style={{ marginBottom: '10px' }}>
          <p>{actionType} ICX</p>
          <Input
            type='number'
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
            {actionType} {selectedToken.symbol}
          </p>
          <Input
            type='number'
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
