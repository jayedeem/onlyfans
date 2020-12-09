import React, { useState } from 'react'
import { SelectOptions } from './'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { FormControl, TextField } from '@material-ui/core'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: '100px'
  }
}))

export const Menu = ({
  singleUser,
  setAmount,
  selectValue,
  setSelectValue,
  handleSelect
}) => {
  const classes = styles()

  return (
    <>
      <Box margin={1}>
        <Typography variant="h6" gutterBottom component="div">
          Profile
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Current Balance</TableCell>
              <TableCell>
                {selectValue === 'add'
                  ? 'Add '
                  : selectValue === 'remove'
                  ? 'Remove '
                  : selectValue === 'zero'
                  ? 'Deducting '
                  : ''}
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {singleUser.amount}
              </TableCell>
              <TableCell component="th" scope="row">
                {singleUser.amount}
              </TableCell>
              <TableCell component="th" scope="row">
                {singleUser.amount}
              </TableCell>
            </TableRow>
          </TableBody>
          <FormControl className={classes.container}>
            <SelectOptions
              selectValue={selectValue}
              setAmount={setAmount}
              handleSelect={handleSelect}
            />
          </FormControl>
        </Table>
      </Box>
    </>
  )
}
