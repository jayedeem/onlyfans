import { useRef } from 'react'
import {
  Button,
  MenuItem,
  Select,
  TextField,
  makeStyles
} from '@material-ui/core'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { profileState } from '../pages/Profile'
import UserServices from '../services/user.service'
export const menuSelectState = atom({
  key: 'menuselect',
  default: {
    value: ''
  }
})

export const textInputState = atom({
  key: 'textinput',
  default: {
    value: ''
  }
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
  const { user } = useRecoilValue(profileState)

  const selectRef = useRef()
  const textRef = useRef()
  const classes = useStyles()

  const submitHandler = (e) => {
    e.preventDefault()
    handleSubmit(input, menuValue.value, user)
    console.log(user.id)
  }

  const handleSelect = (e) => {
    setMenuValue({ value: e.target.value })
  }

  const handleInput = (e) => {
    if (!menuValue.value) {
      setInput('')
    } else {
      setInput(e.target.value)
    }
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <TextField
        className={classes.field}
        style={{ marginRight: '15px', width: '85px' }}
        placeholder={
          !menuValue.value || menuValue.value === 'zero'
            ? 'Disabled'
            : '$ Amount...'
        }
        disabled={!menuValue.value || menuValue.value === 'zero'}
        value={input.value}
        inputRef={textRef}
        onChange={handleInput}
        // defaultValue={input.value}
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
