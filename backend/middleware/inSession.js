module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(404).json({
      error: {
        msg: 'You are not Logged in!'
      }
    })
    // return next(new Error('You are not authenticated')) // handle error
  }
  console.log(req.session)
  next() // otherwise continue
}
