var jwt = require("jsonwebtoken");

module.exports = {
  showMe: function(req, res, next) {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        res.send(err)
      } else {
        res.json({
          user: decoded
        });
      }
    });
  }
};