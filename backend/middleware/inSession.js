module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return next(new Error('You are not authenticated'))
  }
  console.log(req.session)
  next() // otherwise continue
}
