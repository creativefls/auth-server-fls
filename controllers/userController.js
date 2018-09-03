let { findAllUsers, updateUserRoleById } = require('../factory');

module.exports = {
  index: async function(req, res, next) {
    try {
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
    } catch (error) {
      res.status(500).send({
        message: error.message,
        reason: error
      })
    }
  },
  updateRole: async function (req, res, next) {
    try {
      let userId = req.params.id
      let roles = req.body.roles
      let result = await updateUserRoleById(userId, roles)
      res.send(result)
    } catch (error) {
      res.status(500).send({
        message: error.message,
        reason: error
      })
    }
  }
};
