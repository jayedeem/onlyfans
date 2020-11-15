import React from 'react';

const HomePage = () => {
  return (
    <div style={stylesHome}>
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;

const stylesHome = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};
