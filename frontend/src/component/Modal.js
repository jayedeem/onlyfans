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
      {/* <pre>{JSON.stringify(userDetails, null, 2)}</pre> */}

      {!userDetails ? (
        <div>Loading...</div>
      ) : (
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
          <h1>
            {userDetails.customer.firstName} {userDetails.customer.lastName}'s
            Details
          </h1>

          <li>Current Balance: ${userDetails.amount}</li>
          <li>{userDetails.customer.email}</li>
          <label>Add Credit</label>

          <input type="text" placeholder="Enter An amount" />

          <button>Submit</button>
        </div>
      )}
    </Modal>
  );
}

export default UserModal;
