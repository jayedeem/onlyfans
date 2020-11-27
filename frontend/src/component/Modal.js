import React from 'react';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';

function UserModal({ showModal, handleToggle, user }) {
  const [userDetails, setUserDetails] = React.useState([]);

  React.useEffect(() => {
    getUserDetails();
  }, [user]);

  async function getUserDetails() {
    const userData = await axios.get(
      `http://localhost:1337/api/rewardify/user/${user}`
    );
    console.log(userData.data);
    setUserDetails(userData.data);
  }

  return (
    <Modal
      open={showModal}
      onClose={handleToggle}
      style={{
        outline: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '700px',
          height: 500,
          color: 'black',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <h1>Hello</h1>
        <pre>{JSON.stringify(userDetails, null, 2)}</pre>

        {/* <li>{userDetails.customer.firstName}</li> */}
      </div>
    </Modal>
  );
}

export default UserModal;
