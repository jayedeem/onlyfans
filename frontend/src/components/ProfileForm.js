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
import UserServices from '../services/user.service'

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

export const ProfileForm = ({ handleSubmit }) => {
  const [menuValue, setMenuValue] = useRecoilState(menuSelectState)
  const [input, setInput] = useRecoilState(textInputState)
  const [click, setClick] = useRecoilState(clickState)
  const user = useRecoilValue(rewardsProfileState)
  const [selectedInput, setSelectedInput] = useState('Disabled')
  // const textInput = useRecoilValue(textInputState)
  const selectRef = useRef()
  const textRef = useRef()
  const classes = useStyles()

  const submitHandler = (e) => {
    e.preventDefault()
    setClick(true)
    setInput('')
    handleSubmit(input, menuValue.value, user)
    window.location.reload()
  }

  const handleSelect = (e) => {
    if (menuValue.value === 'zero') {
      setSelectedInput('Disabled')

      setMenuValue({ value: e.target.value })
    }
    setSelectedInput('Amount')
    setMenuValue({ value: e.target.value })
  }

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <TextField
        className={classes.field}
        style={{ marginRight: '15px', width: '85px' }}
        placeholder={selectedInput}
        disabled={selectedInput === 'Disabled'}
        value={input}
        // inputRef={textRef}
        onChange={handleInput}
        // InputProps={{ handleInput }}
        defaultValue=""
        // inputRef
        name="amount"
        type="number"
      />

      <Select
        style={{ marginRight: '25px' }}
        labelId="select-label"
        id="select-input"
        defaultValue={''}
        onChange={handleSelect}
        value={menuValue.value}
        innerRef={selectRef}
      >
        <MenuItem value="add">Add</MenuItem>
        <MenuItem value="remove">Remove</MenuItem>
        <MenuItem value="zero">Reset</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!menuValue.value}
      >
        Submit
      </Button>
    </form>
  )
}
