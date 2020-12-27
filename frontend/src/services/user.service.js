import axios from 'axios'
import authHeader from './auth.header'
const user = JSON.parse(localStorage.getItem('user'))
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
    try {
      const res = axios({
        url: 'http://localhost:1337/api/rewardify/addCredit',
        method: 'PUT',
        headers: {
          'Context-type': 'application/json',
          'x-access-token': user.accessToken
        },
        data
      })

      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  //http://localhost:1337/api/rewardify/removeCredit
  removeCredit(data) {
    try {
      const res = axios({
        url: 'http://localhost:1337/api/rewardify/subtractCredit',
        method: 'PUT',
        headers: {
          'Context-type': 'application/json',
          'x-access-token': user.accessToken
        },
        data
      })

      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  //'http://localhost:1337/api/rewardify/zeroCredit'
  zeroCredit(data) {
    try {
      const res = axios({
        url: 'http://localhost:1337/api/rewardify/replaceCredit',
        method: 'PUT',
        headers: {
          'Context-type': 'application/json',
          'x-access-token': user.accessToken
        },
        data
      })

      return res.data
    } catch (error) {
      console.error(error)
    }
  }
  async createUser(firstName, lastName, email, amount) {
    try {
      const res = await axios({
        url: 'http://localhost:1337/api/shopify/userCreation',
        method: 'POST',
        headers: {
          'Context-type': 'application/json',
          'x-access-token': user.accessToken
        },
        data: {
          first_name: firstName,
          last_name: lastName,
          email
        }
      })

      return res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default new UserService()
