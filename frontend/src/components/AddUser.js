import { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import CheckButton from 'react-validation/build/button'
import Form from 'react-validation/build/form'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userListState } from '../recoil'
import * as yup from 'yup'
import UserServices from '../services/user.service'
import {
  emailState,
  firstNameState,
  lastNameState,
  initialAmountState
} from '../recoil'
import Alert from '@material-ui/lab/Alert'
import { useFormik } from 'formik'
import { Loading } from './'
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
const validationSchema = yup.object({
  firstName: yup.string().required('Required!'),
  lastName: yup.string().required('Required!'),
  email: yup.string().email().required('Required!'),
  amount: yup.number().required('Required!')
})

export const AddUser = ({ handleClose, open, setOpen }) => {
  const classes = useStyles()
  const [firstName, setFirstName] = useRecoilState(firstNameState)
  const [lastName, setLastName] = useRecoilState(lastNameState)
  const [amount, setAmount] = useRecoilState(initialAmountState)
  const [email, setEmail] = useRecoilState(emailState)
  const [userList, setUserList] = useRecoilState(userListState)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const form = useRef()
  const checkBtn = useRef()
  const [modalStyle] = useState(getModalStyle)
  const [loading, setLoading] = useState('')

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      amount: ''
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    }
  })

  const handleSubmit = (values) => {
    if (!values) {
      setMessage('Must enter values')
    }
    setLoading(true)

    UserServices.createUser(values.firstName, values.lastName, values.email)
      .then((res) => res)

      .then((res) => {
        const data = {
          userId: String(res.status.data.customer.id),
          email: '',
          amount: String(values.amount),
          memo: '',
          expiresAt: '2025-12-23T23:25:47.054Z'
        }

        return setTimeout(() => {
          return UserServices.addCredit(data)
        }, 4000)
      })
      .then(() => formik.resetForm())
      .then(() => {
        setOpen(!open)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }

  // if (formik.isSubmitting) {
  //   return <Loading />
  // }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={modalStyle}
          className={classes.paper}
          noValidation
          ref={form}
        >
          <AddUser />
          <h2 style={{ marginBottom: '10px' }}>Create New User</h2>
          <Form onSubmit={formik.handleSubmit}>
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
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      placeholder="First Name..."
                    />
                    {formik.errors.firstName ? (
                      <Alert variant="filled" severity="error">
                        {formik.errors.firstName}
                      </Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      size="small"
                      type="text"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      placeholder="Last Name..."
                      variant="outlined"
                    />
                    {formik.errors.lastName ? (
                      <Alert variant="filled" severity="error">
                        {formik.errors.lastName}
                      </Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      size="small"
                      type="text"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      placeholder="Email..."
                      variant="outlined"
                    />
                    {formik.errors.email ? (
                      <Alert variant="filled" severity="error">
                        {formik.errors.email}
                      </Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Starting Amount"
                      name="amount"
                      size="small"
                      type="number"
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      placeholder="Enter an amount..."
                      variant="outlined"
                    />
                    {formik.errors.amount ? (
                      <Alert variant="filled" severity="error">
                        {formik.errors.amount}
                      </Alert>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Loading' : 'Submit'}
                </Button>
                <small>Addresses are defaulted to Costa Mesa</small>
              </Grid>
            </Grid>
          </Form>
        </div>
      </Modal>
    </div>
  )
}
