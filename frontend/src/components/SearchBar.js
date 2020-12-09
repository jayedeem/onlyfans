import TextField from '@material-ui/core/TextField'

export const SearchBar = ({ handleChange }) => {
  return (
    <TextField
      style={{ width: '500px', marginBottom: '20px' }}
      placeholder="Search..."
      onChange={handleChange}
    />
  )
}
