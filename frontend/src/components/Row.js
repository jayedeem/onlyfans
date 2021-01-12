import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import { Link } from 'react-router-dom'

export const Row = ({ user }) => {
  function truncateString(str) {
    if (str.length <= 11) {
      return str
    }
    return str.slice(0, 11) + '...'
  }

  return (
    <TableRow>
      <TableCell align="left" component="th" scope="row" style={{ width: 1 }}>
        <Link
          to={{ pathname: `/users/${user.id}`, state: { user } }}
          style={{
            textDecoration: 'none',
            padding: '0px',
            width: '20%',
            color: '#000'
          }}
        >
          {user.id}
        </Link>
      </TableCell>

      <TableCell align="left">{user.first_name}</TableCell>
      <TableCell align="left">{truncateString(user.last_name)}</TableCell>
      <TableCell align="left">{user.email}</TableCell>
    </TableRow>
  )
}
