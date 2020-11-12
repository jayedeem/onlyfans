import React from 'react';

const ShowFields = ({
  replaceCredit,
  shopid,
  replaceAmount,
  amount,
  changeAmount,
  user,
  setReplaceCredit,
  setAmount,
  setLoading,
}) => {
  const handleReplaceAmount = (e) => {
    setReplaceCredit(e.target.value);
  };
  const handleSetAmount = (e) => {
    setAmount(e.target.value);
  };
  return (
    <div>
      <input
        type="input"
        value={replaceCredit}
        onChange={(e) => handleReplaceAmount(e)}
      />
      <button
        onClick={() => {
          replaceAmount(replaceCredit, shopid);
          setLoading(true);
        }}
      >
        Replace Amount
      </button>

      <p>state amount: {replaceCredit}</p>

      <input
        type="text"
        name="amount"
        value={amount}
        onChange={(e) => handleSetAmount(e)}
      />
      <button
        onClick={() => {
          changeAmount(amount, shopid);
          setLoading(true);
          setAmount('');
        }}
      >
        Add Credit
      </button>

      {/* <p>amount: {user.data.amount}</p> */}
      <p>state amount: {amount}</p>
      <div>
        <label>User Details</label>
        <li>First Name: {user.customer.firstName}</li>
        <li>Last Name: {user.customer.lastName}</li>
        <li>You have ${user.amount} in your account</li>
      </div>
    </div>
  );
};

export default ShowFields;
