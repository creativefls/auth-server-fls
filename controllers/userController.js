let User = require("../models/user");

module.exports = {
  index: function(req, res, next) {
    User.find().then(result => {
      res.send(result.map(item => {
        return {
          id: item._id,
          username: item.username,
          email: item.email,
          emailVerified: item.emailVerified,
          roles: item.roles,
          info: item.info,
          banned: item.banned,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }
      }))
    })
  }
};
