import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import TableCell from '@material-ui/core/TableCell'

import TableRow from '@material-ui/core/TableRow'

import { Collapse } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import axios from 'axios'
import { Menu } from './Menu'
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
})

export const Row = ({ row }) => {
  const [open, setOpen] = React.useState(false)
  const [singleUser, setSingleUser] = useState([])
  const [amount, setAmount] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const classes = useRowStyles()

  const handleSubmit = async (userId) => {
    const { data } = await axios.get(
      `http://localhost:1337/api/rewardify/user/${userId}`
    )
    setSingleUser(data)
  }

  const handleSelect = (e) => {
    setSelectValue(e.target.value)
  }

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open)
              handleSubmit(row.id)
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.first_name}</TableCell>
        <TableCell align="right">{row.last_name}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Menu
              singleUser={singleUser}
              setAmount={setAmount}
              selectValue={selectValue}
              handleSelect={handleSelect}
              setSelectValue={setSelectValue}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
