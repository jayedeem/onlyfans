import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { Link } from 'react-router-dom'

export const Row = ({ user }) => {
  return (
    <TableRow>
      <TableCell
        component={Link}
        to={{ pathname: `/users/${user.id}`, state: { user } }}
        align="left"
      >
        {user.id}
      </TableCell>

      <TableCell align="left">{user.first_name}</TableCell>
      <TableCell align="left">{user.last_name}</TableCell>
      <TableCell align="left">{user.email}</TableCell>
    </TableRow>
  )
}
