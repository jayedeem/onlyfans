import TextField from '@material-ui/core/TextField'

export const SearchBar = ({ handleQuery }) => {
  return (
    <TextField
      style={{
        width: '500px',
        margin: '10px',
        padding: '10px'
      }}
      placeholder="Search..."
      onChange={handleQuery}
      color="primary"
    />
  )
}
