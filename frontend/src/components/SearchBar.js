import TextField from '@material-ui/core/TextField'

export const SearchBar = ({ handleQuery }) => {
  return (
    <TextField
      // style={{
      //   width: '200px'
      // }}
      placeholder="Search..."
      onChange={handleQuery}
      color="primary"
      fullWidth
    />
  )
}
