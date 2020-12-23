import { useRef } from 'react'
import { Button, MenuItem, Select, TextField } from '@material-ui/core'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { reducer } from './ProfileActions'

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

export const ProfileForm = () => {
  const [menuValue, setMenuValue] = useRecoilState(menuSelectState)
  const [input, setInput] = useRecoilState(textInputState)
  const { value, text } = useRecoilValue(reducer)
  const selectRef = useRef()
  const textRef = useRef()

  const handleSelect = (e) => {
    // setAmount('')
    // console.log('onchange', e.target.value)
    // dispatch({ type: 'SELECT_VALUE', payload: e.target.value })
    setMenuValue({ value: e.target.value })
  }

  const handleInput = (e) => {
    if (menuValue.value === '') {
      setInput(0)
    } else {
      setInput(e.target.value)
    }
  }

  return (
    <div>
      <form onSubmit={(e) => alert('1')}>
        <TextField
          style={{ marginRight: '15px' }}
          placeholder={menuValue.value === '' ? 'Pick an Option' : 'Amount...'}
          disabled={menuValue.value === ''}
          value={input.value}
          innerRef={textRef}
          onChange={handleInput}
        />

        <Select
          style={{ marginRight: '25px' }}
          labelId="select-label"
          id="select-input"
          onChange={handleSelect}
          value={menuValue.value}
          innerRef={selectRef}
        >
          <MenuItem value="add">Add Credit</MenuItem>
          <MenuItem value="remove">Remove Credit</MenuItem>
          <MenuItem value="zero">0 Credit</MenuItem>
        </Select>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}
