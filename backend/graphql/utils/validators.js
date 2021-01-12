module.exports.validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }
  if (password === '') {
    errors.password = 'Password must not be empty'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateAddCredits = (userId, amount) => {
  const errors = {}
  if (userId.trim() === '') {
    errors.userId = 'ID must not be empty'
  }
  if (amount === '') {
    errors.amount = 'Amount must not be empty'
  } else {
    const regEx = /^\d+$/
    if (!amount.match(regEx)) {
      errors.amount = 'Amount must be numbers'
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}
