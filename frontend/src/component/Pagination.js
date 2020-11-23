import React from 'react';

const Paginate = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];

  const numberOfPages = Math.ceil(totalUsers / usersPerPage);
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul style={styles.paginate}>
        {pageNumbers.map((number) => {
          return (
            <li
              key={number}
              style={{ listStyleType: 'none', cursor: 'pointer' }}
            >
              <a onClick={() => paginate(number)}>{number}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const styles = {
  paginate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',
    textAlign: 'center',
  },
};

export default Paginate;
