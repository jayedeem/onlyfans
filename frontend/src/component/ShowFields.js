import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UsersContext } from '../context';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const ShowFields = ({ token, id, setUserDetails, setIsLoading }) => {
  const context = useContext(UsersContext);
  const [amount, setAmount] = React.useState();
  const [debitAmount, setDebitAmount] = useState();
  const [resetCredit, setResetCredit] = useState();

  const handleDebitAmount = (e) => {
    setDebitAmount(e.target.value);
  };
  const handleSetAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleReset = (e) => {
    setResetCredit(e.target.value);
  };

  const updateMe = async (userId) => {
    const url = `/api/rewardify/user/${userId}`;
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${context.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserDetails(res.data);
      })
      .catch((err) => console.log(err));
  };
  const addCredit = async (value, user) => {
    await axios.request({
      url: 'http://localhost:5000/api/rewardify/addcredit',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: '',
        amount: value,
        memo: 'hello',
        expiresAt: '2021-05-05T10:21:05.349Z',
        token: context.token,
        userid: id,
      },
    });

    updateMe(user);
  };
  const subtractCredit = async (value, user) => {
    // let isRendered = false;
    await axios.request({
      url: `/customer/${user}/account/debit`,
      method: 'PUT',
      baseURL: proxyUrl + 'https://api.rewardify.ca/',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        email: '',
        amount: value,
        memo: 'hello',
      },
    });

    updateMe(user);
  };

  const resetUserCredit = async (value, user) => {
    await axios.request({
      url: `/customer/${user}/account/reset`,
      method: 'PUT',
      baseURL: proxyUrl + 'https://api.rewardify.ca/',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        email: '',
        amount: value,
        memo: 'hello',
        expiresAt: '2021-05-05T10:21:05.349Z',
      },
    });

    updateMe(user);
  };

  return (
    <>
      {/* Add Credit */}
      <input
        type="text"
        name="amount"
        placeholder="Add Credit"
        value={amount || ''}
        onChange={(e) => handleSetAmount(e)}
      />
      <button
        onClick={() => {
          console.log('add credit clicked');
          addCredit(amount, id);
          setAmount('');
        }}
      >
        Add Credit
      </button>
      <br />

      {/* Deduct Credit */}
      <input
        type="text"
        name="amount"
        placeholder="Subtract Credit"
        value={debitAmount || ''}
        onChange={(e) => handleDebitAmount(e)}
      />
      <button
        onClick={() => {
          console.log('sub credit clicked');
          subtractCredit(debitAmount, id);
          setDebitAmount('');
        }}
      >
        Subtract Credit
      </button>
      <br />
      {/* Replace Credit with a different value */}
      <input
        type="text"
        name="amount"
        placeholder="Replace Credit"
        value={resetCredit || ''}
        onChange={(e) => handleReset(e)}
      />
      <button
        onClick={() => {
          console.log('reset credit clicked');
          resetUserCredit(resetCredit, id);
          setResetCredit('');
        }}
      >
        Reset Credit
      </button>
    </>
  );
};

export default ShowFields;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px',
  },
};
