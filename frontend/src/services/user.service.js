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
    return axios.get(
      API_URL + 'rewardify/addCredit',
      { headers: authHeader() },
      data
    )
  }
}

export default new UserService()
