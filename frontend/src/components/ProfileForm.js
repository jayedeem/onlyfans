import { useRef } from 'react'
import {
  Button,
  MenuItem,
  Select,
  TextField,
  makeStyles
} from '@material-ui/core'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { textInputState } from '../pages/Profile'
import { useState } from 'react'
import { rewardsProfileState } from './ProfileTable'
import { useFormik, Field, Formik } from 'formik'
import * as yup from 'yup'
export const menuSelectState = atom({
  key: 'menuselect',
  default: {
    value: ''
  }
})

export const clickState = atom({
  key: 'clickState',
  default: true
})

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '20px',
    width: '100%'
  },
  field: {
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none'
    }
  }
}))

const validationSchema = yup.object({
  amount: yup.number().required('Required!'),
  menuItem: yup.string().required('Required!')
})

export const ProfileForm = ({ handleSubmit }) => {
  const [menuValue, setMenuValue] = useRecoilState(menuSelectState)
  const [input, setInput] = useRecoilState(textInputState)
  const user = useRecoilValue(rewardsProfileState)
  const [selectedInput, setSelectedInput] = useState('Disabled')
  // const textInput = useRecoilValue(textInputState)
  const selectRef = useRef()

  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      amount: '',

      user: user.id
    },
    validationSchema,
    onSubmit: (values) => {
      submitHandler(values)
    }
  })

  const submitHandler = async (values, user) => {
    setInput('')
    const res = await handleSubmit(values.amount, values.menuItem, values.user)
    console.log(res)
  }

  const handleSelect = (e) => {
    console.log(formik.values)
    // if (formik.values.selector === 'zero') {
    //   alert('Zero')
    //   setSelectedInput('Disabled')

    //   setMenuValue({ value: e.target.value })
    // }
    // setSelectedInput('Amount')
    // setMenuValue({ value: e.target.value })
  }

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const initialValues = {
    amount: ''
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(e, values) => {
        e.preventDefault()
        console.log(values)
      }}
    >
      {({ values }) => (
        <form className={classes.form}>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          <Field
            name="amount"
            as={TextField}
            className={classes.field}
            style={{ marginRight: '15px', width: '85px' }}
            placeholder={values.selector === 'zero' ? 'Disabled' : 'Amount'}
            disabled={values.selector === 'zero'}
            // value={formik.values.amount}
            // inputRef={textRef}
            // onChange={formik.handleChange}
            label="amount"
            defaultValue=""
            // inputRef

            type="number"
          />

          <Field
            as={Select}
            style={{ marginRight: '25px' }}
            labelId="select-label"
            id="select-input"
            name="selector"
            defaultValue={''}
            // onChange={formik.handleChange}
            // value={formik.values.menuItem}
            // innerRef={selectRef}
          >
            <MenuItem value="add">Add</MenuItem>
            <MenuItem value="remove">Remove</MenuItem>
            <MenuItem value="zero">Reset</MenuItem>
          </Field>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // disabled={formik.isSubmitting}
          >
            go
            {/* {formik.isSubmitting ? 'Loading' : 'Submit'} */}
          </Button>
        </form>
      )}
    </Formik>
  )
}
