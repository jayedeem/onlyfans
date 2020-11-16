import axios from 'axios';
import React from 'react';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const ShowFields = ({ token, id, setUserDetails, setIsLoading }) => {
  const [replacementCredit, setReplacementCredit] = React.useState();
  const [amount, setAmount] = React.useState();

  // const handleReplaceAmount = (e) => {
  //   setReplacementCredit(e.target.value);
  // };
  const handleSetAmount = (e) => {
    setAmount(e.target.value);
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
    let isRendered = false;
    const data = await axios.request({
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
    // const res = data.data;
    updateMe(user);
    isRendered = true;
  };

  return (
    <div>
      {/* <input
        type="input"
        value={replacementCredit}
        placeholder="replace credit"
        onChange={(e) => handleReplaceAmount(e)}
      />
      <button
        onClick={() => {
          // replaceAmount(replacementCredit, id);
          console.log('replace credit clicked');
        }}
      >
        Replace Amount
      </button>

      <p>state amount: {replacementCredit}</p> */}

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
    </div>
  );
};

export default ShowFields;
