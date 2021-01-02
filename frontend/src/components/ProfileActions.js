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
import { textInputState } from '../pages/Profile'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import UserServices from '../services/user.service'

function doMath({ value }, amount, { api: currentUser }) {
  switch (value) {
    case 'add':
      return `$${parseFloat(amount) + parseFloat(currentUser.amount)} `
    case 'remove':
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
    case 'zero':
      return `$${
        parseFloat(currentUser.amount) - parseFloat(currentUser.amount)
      } `
    default:
      return
  }
}

function values({ value }) {
  switch (value) {
    case 'add':
      console.log('valuesFunc add')
      return 'Adding Credit'
    case 'remove':
      console.log('valuesFunc remove')
      return 'Remove Credit'
    case 'zero':
      console.log('valuesFunc zero')
      return 'Reset Credit'
    default:
      return 'Edit'
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
    const textValues = values(option)
    const valueToText =
      textValues === 'zero' && Object.values(user).length
        ? `$${parseInt(Object.values(user)[0].amount).toFixed(2)}`
        : `$${input}`
    return {
      computation,
      textValues,
      valueToText,
      user
    }
  }
})

export const ProfileActions = ({ profileUser }) => {
  const [currentUser, setCurrentUser] = useState({})
  const selectedOptions = useRecoilValue(menuSelectState)
  const input = useRecoilValue(textInputState)
  const { user, computation, textValues: text, valueToText } = useRecoilValue(
    reducer
  )
  const { id } = useParams()

  useEffect(() => {
    async function retrieve() {
      const { data } = await UserServices.getUser(id)
      setCurrentUser(data.api)
    }
    retrieve()
  }, [id])

  return (
    <>
      {/* <pre>{JSON.stringify(currentUser, null, 2)}</pre> */}

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
              ${parseFloat(currentUser.amount).toFixed(2)}
            </TableCell>
            <TableCell>{!input.length ? '' : valueToText}</TableCell>
            <TableCell>
              {!input.length
                ? ` $${parseFloat(currentUser.amount).toFixed(2)}`
                : computation}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
