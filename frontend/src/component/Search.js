import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../context';

const Search = ({ currentUsers, isLoading }) => {
  const Context = useContext(UsersContext);

  return (
    <ul
      style={{
        textDecoration: 'none',
        listStyleType: 'none',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      {currentUsers.map((user) => {
        return (
          <li style={{ padding: '2px' }} key={user.shopifyId}>
            <Link
              style={{
                textDecoration: 'none',
                listStyleType: 'none',
                padding: '10px',
              }}
              to={{
                pathname: `users/${user.id}`,
                state: {
                  userID: user.id,
                  userToken: Context.token,
                },
              }}
            >
              {user.id}
            </Link>
            {user.first_name} {user.last_name}
          </li>
        );
      })}
    </ul>
  );
};

// const Search = ({ users }) => {
//   const [searchValue, setSearchValue] = useState('');
//   const token = useContext(UsersContext);

//   // const handleSearch = users.filter((u) => {
//   //   return (
//   //     u.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
//   //     u.last_name.toLowerCase().includes(searchValue.toLowerCase())
//   //   );
//   // });

//   const handleChange = (e) => {
//     setSearchValue(e.target.value);
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         margin: '20px',
//       }}
//     >
//       <label htmlFor="search">Search by Name:</label>

//       <input
//         style={{ margin: '10px 0 10px 0', width: '300px', padding: '5px' }}
//         type="text"
//         value={searchValue || ''}
//         placeholder="Search an employee.."
//         onChange={(e) => handleChange(e)}
//       />

//       {users.length === 0 ? (
//         <div>No users with that name exists</div>
//       ) : (
//         users.map((user) => {
//           return (
//             <ul
//               key={user.id}
//               style={{
//                 textDecoration: 'none',
//                 listStyleType: 'none',
//                 display: 'flex',
//                 flexDirection: 'row',
//                 textAlign: 'center',
//                 justifyContent: 'space-around',
//               }}
//             >
// <li style={{ padding: '2px' }}>
//   <Link
//     style={{
//       textDecoration: 'none',
//       listStyleType: 'none',
//       padding: '10px',
//     }}
//     to={{
//       pathname: `users/${user.id}`,
//       state: {
//         userID: user.id,
//         userToken: token,
//       },
//     }}
//   >
//     {user.id}
//   </Link>
//   {user.first_name} {user.last_name}
// </li>
//             </ul>
//           );
//         })
//       )}
//       {/* <pre>{JSON.stringify(handleSearch, null, 2)}</pre> */}
//     </div>
//   );
// };

export default Search;
