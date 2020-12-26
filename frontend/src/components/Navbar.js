import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { useLocation } from 'react-router-dom'
import { userState } from '../App'

import { useRecoilState } from 'recoil'
import { userCountState, pageState, searchQuery } from '../recoil'
import { useState } from 'react'
import { Loading } from './'
import { SearchBar } from './'
import SearchIcon from '@material-ui/icons/Search'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export const Navbar = () => {
  const [userAuth, setUserAuth] = useRecoilState(userState)
  const [_, setPage] = useRecoilState(pageState)
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useRecoilState(searchQuery)
  const [count, setCount] = useRecoilState(userCountState)
  const [toggleSearch, setToggleSearch] = useState(false)
  const classes = useStyles()
  const location = useLocation()

  const handleLogout = () => {
    if (userAuth) {
      setUserAuth(null)
      setIsLoading(!isLoading)
      console.log('loading?', isLoading)
      setTimeout(() => {
        localStorage.clear('user')
        return window.location.reload()
      }, 2000)
    }
  }

  const toggleSearchBar = () => {
    setToggleSearch(!toggleSearch)
  }

  const handleQuery = (e) => {
    setPage(0)
    // setStatus('Querying')
    setSearchValue(e.target.value)
    console.log(searchValue)
    // setCount(searchValue.length)
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color={'#fff'}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CMS
          </Typography>
          {location.pathname !== '/users/:id' && (
            <IconButton
              onClick={toggleSearchBar}
              aria-label="search"
              color="inherit"
            >
              <SearchIcon />
            </IconButton>
          )}
          {toggleSearch && location.pathname !== `/users/:id'` ? (
            <SearchBar handleQuery={handleQuery} />
          ) : null}

          <Button onClick={handleLogout} color="inherit">
            {userAuth ? 'Logout' : null}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
