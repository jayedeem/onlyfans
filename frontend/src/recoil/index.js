import { atom } from 'recoil'

export const usernameState = atom({
  key: 'usernameState',
  default: ''
})

export const passwordState = atom({
  key: 'passwordState',
  default: ''
})

export const loadingState = atom({
  key: 'loadingState',
  default: false
})

export const messageState = atom({
  key: 'messageState',
  default: ''
})

export const userListState = atom({
  key: 'userlist',
  default: []
})

export const searchQuery = atom({
  key: 'searchquery',
  default: ''
})

export const pageState = atom({
  key: 'pageState',
  default: 0
})

export const userCountState = atom({
  key: 'userCountState',
  default: null
})

export const searchQueryLength = atom({
  key: 'searchQueryLength',
  default: []
})

/**
 * user creation block
 */

export const firstNameState = atom({
  key: 'firstNameState',
  default: ''
})

export const lastNameState = atom({
  key: 'lastNameState',
  default: ''
})

export const initialAmountState = atom({
  key: 'initialAmountState',
  default: ''
})

export const emailState = atom({
  key: 'emailState',
  default: ''
})
