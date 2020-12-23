import axios from 'axios'
import authHeader from './auth.header'

const API_URL = 'http://localhost:1337/api/'

class UserService {
  getUsers() {
    return axios.get('http://localhost:1337/api/shopify/users', {
      headers: authHeader()
    })
  }

  getUser(id) {
    console.log('getuser', id)
    return axios.get(API_URL + `rewardify/user/${id}`, {
      headers: authHeader()
    })
  }

  addCredit(data) {
    console.log(data)
    return axios.put(
      'https://cors-anywhere.herokuapp.com/http://localhost:1337/api/rewardify/addCredit',
      { headers: authHeader() },
      data
    )
  }

  removeCredit(data) {
    return axios.put(
      API_URL + 'rewardify/removeCredit',
      { headers: authHeader() },
      data
    )
  }
  zeroCredit(data) {
    return axios.put(
      API_URL + 'rewardify/replaceCredit',
      { headers: authHeader() },
      data
    )
  }
}

export default new UserService()
