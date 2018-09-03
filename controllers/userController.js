let { findAllUsers } = require('../factory');

module.exports = {
  index: async function(req, res, next) {
    let result = await findAllUsers()
    result = result.map(item => {
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
    })
    res.send(result)
  },
  updateRole: function (req, res, next) {

  }
};
