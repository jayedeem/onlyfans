import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Row } from './'

export const UserTable = ({ usersData, searchQuery, open, setOpen }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Shopify ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData
            .filter((val) => {
              if (searchQuery === '') {
                return val
              } else if (
                val.first_name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                val.last_name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                val.email.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                return val
              } else {
                return
              }
            })
            .map((row) => (
              <Row key={row.name} row={row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
