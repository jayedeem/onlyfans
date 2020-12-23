import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody
} from '@material-ui/core'
import { Loading } from './'
import { useRecoilValue, selector } from 'recoil'
import { rewardsProfileState } from './ProfileTable'
import { menuSelectState } from '../components/ProfileForm'
import { textInputState } from './ProfileForm'

function doMath({ value }, amount, { api: currentUser }) {
  if (value === 'add') {
    return `$${parseFloat(amount) + parseFloat(currentUser.amount)} `
  }
  if (value === 'remove') {
    if (parseFloat(currentUser.amount) === parseFloat(amount)) {
      return `$${
        parseFloat(currentUser.amount) - parseFloat(currentUser.amount)
      } `
    }
    if (parseFloat(currentUser.amount) < parseFloat(amount)) {
      return `$${
        parseFloat(currentUser.amount) - parseFloat(currentUser.amount)
      } `
    }
    return `$${parseFloat(currentUser.amount) - parseFloat(amount)} `
  }
  if (value === 'zero') {
    return `$${
      parseFloat(currentUser.amount) - parseFloat(currentUser.amount)
    } `
  }
}

function values({ value }) {
  const text =
    value === 'add'
      ? 'Adding Credit'
      : value === 'remove'
      ? 'Removing Credit'
      : !value
      ? 'Edit'
      : 'Reset Credit'

  return {
    text,
    value
  }
}

export const reducer = selector({
  key: 'doMath',
  get: ({ get }) => {
    const user = get(rewardsProfileState)
    const option = get(menuSelectState)
    const input = get(textInputState)
    const computation =
      Object.values(user).length && doMath(option, input, user)
    const { text, value } = values(option)
    const valueToText =
      text === 'Zeroing out' && Object.values(user).length
        ? `$${parseInt(Object.values(user)[0].amount).toFixed(2)}`
        : `$${input}`
    return {
      computation,
      text,
      valueToText,
      value
    }
  }
})

export const ProfileActions = () => {
  const currentUser = useRecoilValue(rewardsProfileState)
  const selectedOptions = useRecoilValue(menuSelectState)
  const input = useRecoilValue(textInputState)
  const { computation, text, valueToText } = useRecoilValue(reducer)

  if (!Object.keys(currentUser).length) {
    return <Loading />
  }

  return (
    <>
      {/* <pre>{JSON.stringify(computation, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(selectedOptions, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(input.value, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(text, null, 2)}</pre> */}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Current Balance</TableCell>
            <TableCell>{text}</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              ${parseFloat(currentUser.api.amount).toFixed(2)}
            </TableCell>
            <TableCell>{!input.length ? '' : valueToText}</TableCell>
            <TableCell>
              {!input.length
                ? ` $${parseFloat(currentUser.api.amount).toFixed(2)}`
                : computation}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
