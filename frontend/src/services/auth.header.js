export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.accessToken) {
    return { 'X-access-token': user.accessToken }
  } else {
    return {}
  }
}
