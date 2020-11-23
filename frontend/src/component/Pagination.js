import React, { useState } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';

const Paginate = ({ usersPerPage, totalUsers, paginate }) => {
  const [click, setClick] = useState(true);
  const pageNumbers = [];

  const numberOfPages = Math.ceil(totalUsers / usersPerPage);
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  //
  return (
    <nav style={styles.paginate}>
      {/* <Pagination count={numberOfPages} /> */}
      {pageNumbers.map((number) => {
        return (
          <PaginationItem
            page={number}
            onClick={() => {
              paginate(number);
            }}
            type="page"
            variant="text"
          />
        );
      })}
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
