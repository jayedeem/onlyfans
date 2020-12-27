import { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import CheckButton from 'react-validation/build/button'
import Form from 'react-validation/build/form'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useRecoilState, useRecoilValue } from 'recoil'
import UserServices from '../services/user.service'
import {
  emailState,
  firstNameState,
  lastNameState,
  initialAmountState
} from '../recoil'
function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    height: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column'
  }
}))

export const AddUser = ({ handleClose, open }) => {
  const classes = useStyles()
  const [firstName, setFirstName] = useRecoilState(firstNameState)
  const [lastName, setLastName] = useRecoilState(lastNameState)
  const [amount, setAmount] = useRecoilState(initialAmountState)
  const [email, setEmail] = useRecoilState(emailState)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const form = useRef()
  const checkBtn = useRef()
  const [modalStyle] = useState(getModalStyle)

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const onChangeLastName = (e) => {
    setLastName(e.target.value)
  }

  const onChangeAmount = (e) => {
    setAmount(e.target.value)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // form.current.validateAll()
    console.log(firstName, lastName, email, amount)
    UserServices.createUser(firstName, lastName, email).then((res) =>
      setStatus(res.status.msg)
    )
    // .then(UserServices.addCredit())

    // if (checkBtn.current.context._errors.length === 0) {
    //   UserServices.createUser(firstName, lastName, amount).then(
    //     () => {
    //       window.location.reload()
    //       return history.push('/')
    //     },
    //     (error) => {
    //       const resMessage =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString()

    //       setLoading(false)
    //       setMessage(resMessage)
    //       setPassword('')
    //     }
    //   )
    // } else {
    //   setLoading(false)
    // }
  }

  const creationProcess = (
    <div style={modalStyle} className={classes.paper} noValidation ref={form}>
      <h2>Create New User</h2>

      <Form onSubmit={handleSubmit} ref={form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  size="small"
                  variant="outlined"
                  type="text"
                  value={firstName}
                  onChange={onChangeFirstName}
                  placeholder="First Name..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  size="small"
                  type="text"
                  value={lastName}
                  onChange={onChangeLastName}
                  placeholder="Last Name..."
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  type="text"
                  value={email}
                  onChange={onChangeEmail}
                  placeholder="Email..."
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Starting Amount"
                  name="amount"
                  size="small"
                  type="number"
                  value={amount}
                  onChange={onChangeAmount}
                  placeholder="Enter an amount..."
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" fullWidth type="submit" variant="contained">
              Next
            </Button>
            {status && <p>{status}</p>}
          </Grid>
        </Grid>
      </Form>

      <AddUser />
    </div>
  )

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {creationProcess}
      </Modal>
    </div>
  )
}
