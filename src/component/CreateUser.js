import React from 'react';

const CreateUser = () => {
  const [newUser, setNewUser] = React.useState({
    customer: {
      first_name: '',
      last_name: '',
      email: '',
      verified_email: true,
    },
  });
  return (
    <div styles={styles.container}>
      <form style={styles.formContainer}>
        <label>First Name: </label>
        <input />
        <label>Last Name: </label>
        <input />
        <label>Email: </label>
        <input />
      </form>
    </div>
  );
};

export default CreateUser;

const styles = {
  container: {
    display: 'flex',
  },
  formContainer: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
