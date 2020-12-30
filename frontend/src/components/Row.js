import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import { Link } from 'react-router-dom'

export const Row = ({ user }) => {
  return (
    <TableRow>
      <TableCell align="left">
        <Link
          to={{ pathname: `/users/${user.id}`, state: { user } }}
          style={{ textDecoration: 'none', padding: '0px' }}
        >
          {user.id}
        </Link>
      </TableCell>

      <TableCell align="left">{user.first_name}</TableCell>
      <TableCell align="left">{user.last_name}</TableCell>
      <TableCell align="left">{user.email}</TableCell>
    </TableRow>
  )
}
