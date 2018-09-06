var jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.headers.authorization) {
    var token = req.headers.authorization
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(403).json({
          message: err.message,
          detail: err
        })
      }
      else if (decoded.roles.indexOf('ADMIN') < 0) {
        res.status(403).json({
          message: 'permission denied'
        })
      }
      else {
        req.user = decoded
        next()
      }
    })
  } else {
    res.status(403).json({
      message: 'No token provided'
    })
  }
}
