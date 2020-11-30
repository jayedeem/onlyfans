import React from 'react';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';

function UserModal({ showModal, handleToggle, user }) {
  const [userDetails, setUserDetails] = React.useState([]);

  React.useEffect(() => {
    getUserDetails();
    console.log(userDetails);
  }, [user]);

  async function getUserDetails() {
    const { data } = await axios.get(
      `http://localhost:1337/api/rewardify/user/${user}`
    );

    if (!data) {
      return console.log('no data found');
    }
    let dataArray = [];
    for (let [key, value] of Object.entries(data.customer)) {
      dataArray.push({ [key]: value });
    }
    dataArray.push({ amount: data.amount });
    setUserDetails(dataArray);
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
      {userDetails.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            width: '700px',
            height: 800,
            color: 'black',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Rendering 12 objects for some reason */}
          {userDetails.map((item) => {
            return (
              <li>
                {item.firstName} {item.lastName}
              </li>
            );
          })}
        </div>
      )}
    </Modal>
  );
}

export default UserModal;
