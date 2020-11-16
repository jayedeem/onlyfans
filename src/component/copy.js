import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  BrowserRouter as Route,
  Switch,
  Link,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import UserProfile from './UserProfile';

const ShopUsers = ({ users, setUsers, loading, token }) => {
  const [data, setData] = React.useState([]);

  const filteredUsers = users.customers.filter(
    (user) => user.tags === 'employee'
  );

  const sortFunction = (value) => {
    if (value === 'first_name') {
      return setData(
        filteredUsers.sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
      );
    }
    if (value === 'last_name') {
      return setData(
        filteredUsers.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
      );
    }
  };

  const Person = () => {
    let { url } = useRouteMatch();
    let { id } = useParams();
    let person = find(parseInt(id));
    return (
      <>
        {person.map((user) => {
          return (
            <ul>
              <li key={user.id}>
                <Link to={`${url}/${id}`}>{find(id).first_name}</Link>
              </li>
            </ul>
          );
        })}
        <Switch>
          <Route path={`${url}/:id`}>
            <Person />
          </Route>
        </Switch>
      </>
    );
  };

  function find(id) {
    return data.find((p) => p.id === id);
  }

  return (
    <div>
      {users && !loading && (
        <div>
          <select onChange={(e) => sortFunction(e.target.value)}>
            <option>Select an option</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default ShopUsers;
