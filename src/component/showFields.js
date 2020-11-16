import axios from 'axios';
import React, { useState } from 'react';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const ShowFields = ({ token, id, setUserDetails, setIsLoading }) => {
  const [replacementCredit, setReplacementCredit] = React.useState();
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
    const url =
      proxyUrl + `https://api.rewardify.ca/customer/${userId}/account`;
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserDetails(res.data);
      })
      .catch((err) => console.log(err));
  };
  const addCredit = async (value, user) => {
    // let isRendered = false;
    await axios.request({
      url: `/customer/${user}/account/credit`,
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
    <div styles={styles.container}>
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
          setIsLoading(true);
        }}
      >
        Add Credit
      </button>
      <div>
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
            setIsLoading(true);
          }}
        >
          Subtract Credit
        </button>
      </div>
      <div>
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
            setIsLoading(true);
          }}
        >
          Reset Credit
        </button>
      </div>
    </div>
  );
};

export default ShowFields;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
