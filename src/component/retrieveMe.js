import React, { useState } from 'react';

const RetrieveMe = ({ shopid, retrieveMe, setLoading, setShopID }) => {
  const handleRetrieveMe = (e) => {
    setShopID(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={shopid}
        key={1}
        onChange={(e) => handleRetrieveMe(e)}
      />
      <button
        onClick={() => {
          retrieveMe(shopid);
          setLoading(true);
        }}
      >
        Retrieve User
      </button>
      <p>shopifyId: {shopid}</p>
    </div>
  );
};

export default RetrieveMe;
