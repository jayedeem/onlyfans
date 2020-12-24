export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.accessToken) {
    console.log(user.accessToken)
    return {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken
    }
  } else {
    return {}
  }
}
