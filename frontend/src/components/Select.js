import { TextField } from '@material-ui/core'

import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'

export const SelectOptions = ({ selectValue, setAmount, handleSelect }) => {
  return (
    <>
      <TextField
        style={{ width: '150px', marginRight: '10px' }}
        placeholder={selectValue === 'zero' ? 'Disabled' : 'Amount...'}
        onChange={(e) => {
          setAmount(e.target.value)
        }}
        disabled={selectValue === 'zero'}
      />
      <Select
        style={{ minWidth: '100px', marginRight: '10px' }}
        labelId="select-label"
        id="select-input"
        value={selectValue}
        onChange={handleSelect}
      >
        <MenuItem value={'add'}>Add Credit</MenuItem>
        <MenuItem value={'remove'}>Remove Credit</MenuItem>
        <MenuItem value={'zero'}>0 Credit</MenuItem>
      </Select>
      <Button variant="contained" color="primary">
        {selectValue === 'add'
          ? 'Add'
          : selectValue === 'remove'
          ? 'Remove'
          : selectValue === 'zero'
          ? 'Go'
          : ''}
      </Button>
    </>
  )
}
