import MenuItem from '@material-ui/core/MenuItem'

export const SelectItem = ({ children, ...rest }) => {
  return <MenuItem {...rest}>{children}</MenuItem>
}
