import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Link,
  useParams,
  useRouteMatch,
  Redirect,
} from 'react-router-dom';
import UserProfile from './UserProfile';

const ShopUsers = ({ users, setUsers, loading, token }) => {
  return (
    <>
      {!loading && users && (
        <Router>
          <Switch>
            <Router path="/:id">
              <Person
                users={users}
                setUsers={setUsers}
                loading={loading}
                token={token}
              />
            </Router>
            <Router path="/">
              <Redirect to="/" />
            </Router>
          </Switch>
        </Router>
      )}
    </>
  );
};

function Person({ users, setUsers, loading, token }) {
  let { url } = useRouteMatch();
  let { id } = useParams();
  let person = findPerson(users.customers, parseInt(id));
  console.log(person);
  return (
    <div>
      {!loading && person && (
        <div>
          <ul>
            {person.map((id) => (
              <li key={id}>
                <Link to={`${url}/${id}`}>
                  {findPerson(users.customers, id).id}
                </Link>
              </li>
            ))}
          </ul>

          <Switch>
            <Router path={`${url}/:id`}>
              <Person />
            </Router>
          </Switch>
        </div>
      )}
    </div>
  );
}

function findPerson(user, id) {
  return user.find((person) => person.id === id);
}

export default ShopUsers;
