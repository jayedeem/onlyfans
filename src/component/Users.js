import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../context';
import { UsersContext } from '../context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Container, Paper } from '@material-ui/core';
const Users = () => {
  const users = React.useContext(UsersContext);
  console.log('usecontext', users);
  // const [usersData, setUsersData] = useState(users);
  const [data, setData] = useState([]);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <Consumer>
      {({ users, token }) => {
        if (users.length === 0 && data.length === 0) {
          return <div>Loading...</div>;
        } else {
          setData(users.customers);
          return (
            <Container>
              <>
                <h1>User Page</h1>
              </>
              <List component="ul" disablePadding>
                {data.map((user) => {
                  return (
                    <ListItem
                      disableGutters={true}
                      key={user.id}
                      alignItems="center"
                    >
                      <ListItemText
                        primary={`${user.id} ${user.first_name} ${user.last_name}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Container>

            // <div style={{ marginTop: '10px' }}>
            //   {data.map((user) => {
            //     return (
            //       <ul key={user.id}>
            //         <li style={stylesUsers.list}>
            //           <Link
            //             to={{
            //               pathname: `users/${user.id}`,
            //               state: {
            //                 userID: user.id,
            //                 userToken: token,
            //               },
            //             }}
            //           >
            //             {user.id}
            //           </Link>
            //           {user.first_name} {user.last_name}
            //         </li>
            //       </ul>
            //     );
            //   })}
            // </div>
          );
        }
      }}
    </Consumer>
  );
};

export default Users;

const stylesUsers = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  list: {
    listStyleType: 'none',
  },
};
