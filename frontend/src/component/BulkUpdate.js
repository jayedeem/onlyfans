import React, { useContext } from 'react';
import { useState } from 'react';
import { UsersContext } from '../context';
import axios from 'axios';

const userID = [3781950603395, 3577057411203];
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const BulkUpdate = () => {
  const [dollarAmount, setDollarAmount] = useState('');
  const [click, setClick] = useState(false);
  const token = useContext(UsersContext);

  const handleSubmit = async (e) => {
    setClick(true);
    console.log('clicked');
    e.preventDefault();
    await userID.forEach((user) => {
      axios
        .request({
          url: `/customer/${user}/account/credit`,
          method: 'PUT',
          baseURL: 'http://localhost:1337/https://api.rewardify.ca/',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token.token}`,
          },
          data: {
            email: '',
            amount: dollarAmount,
            memo: 'hello',
            expiresAt: '2021-05-05T10:21:05.349Z',
          },
        })
        .then((res) => {
          console.log(res);
          setClick(false);
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={dollarAmount}
        onChange={(e) => setDollarAmount(e.target.value)}
      />
      <button type="submit">{!click ? 'Submit' : 'Loading..'}</button>
    </form>
  );
};

export default BulkUpdate;
