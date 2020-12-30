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
import { useFormikContext, Field, Formik } from 'formik'
import * as yup from 'yup'
import { useEffect } from 'react'
export const menuSelectState = atom({
  key: 'menuselect',
  default: ''
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
const Logger = () => {
  const [selectedInput, setSelectedInput] = useState('Disabled')
  const [menuValue, setMenuValue] = useRecoilState(menuSelectState)
  const formik = useFormikContext()
  useEffect(() => {
    handleSelect(formik.values)
  }, [formik.values])

  const handleSelect = () => {
    console.log('handle', formik.values.selector)
    if (formik.values.selector === 'undefined') {
      return null
    }
    if (formik.values.selector === 'zero') {
      alert('Zero')
      setSelectedInput('Disabled')

      setMenuValue(formik.values.amount)
    }
    setSelectedInput('Amount')
    setMenuValue(formik.values.amount)
  }

  return null
}

export const ProfileForm = ({ handleSubmit }) => {
  const [input, setInput] = useRecoilState(textInputState)
  const user = useRecoilValue(rewardsProfileState)

  const selectRef = useRef()

  const classes = useStyles()

  const submitHandler = async (values) => {
    setInput('')
    const res = await handleSubmit(values.amount, values.selector, user)
    console.log(res)
  }

  const handleSelect = (values) => {
    console.log('firing', values)
  }

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const initialValues = {
    amount: ''
  }

  // const onSubmit = async (values, formikProps) => {
  //   console.log('onSubmit -> values, formikProps', values, formikProps)

  //   setTimeout(() => {
  //     console.log('resolved timeout at onSubmit')
  //   }, 5000)
  // }
  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting
      }) => (
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Logger />
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          <Field
            name="amount"
            as={TextField}
            className={classes.field}
            style={{ marginRight: '15px', width: '85px' }}
            // placeholder={values.selector === 'zero' ? 'Disabled' : 'Amount'}
            // disabled={values.selector === 'zero'}
            // value={formik.values.amount}
            // inputRef={textRef}
            onChange={handleChange}
            label="amount"
            defaultValue=""
            // inputRef

            type="number"
          />

          <Select
            style={{ marginRight: '25px' }}
            labelId="select-label"
            id="select-input"
            name="selector"
            defaultValue={''}
            onChange={handleChange}
          >
            <MenuItem value="add">Add</MenuItem>
            <MenuItem value="remove">Remove</MenuItem>
            <MenuItem value="zero">Reset</MenuItem>
          </Select>
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
