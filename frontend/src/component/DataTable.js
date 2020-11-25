import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    marginTop: '100px',
    maxWidth: 650,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    padding: 0,
  },
  tableRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 0,
  },
});

const MouseOver = (e) => {
  e.target.style.background = 'red';
};

const MouseOut = (e) => {
  e.target.style.background = '';
};

// const SomeModal = ({ toggleModal }) => {

// };

export default function BasicTable({ currentUsersPerPage }) {
  const classes = useStyles();
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    console.log(currentUsersPerPage);
  }, []);

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.table}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Shopify ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsersPerPage.map((row) => (
              <TableRow
                key={row.id}
                className={classes.link}
                component={Link}
                onClick={handleToggle}
              >
                <TableCell component="tr" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.first_name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={showModal}
        onClose={handleToggle}
        style={{
          outline: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '400px',
            color: '#fff',
            background: 'purple',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <h1>Hello</h1>
          <p>Hello</p>
          <h1>Hello</h1>
        </div>
      </Modal>
    </>
  );
}
