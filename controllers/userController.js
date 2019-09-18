let {
  findAllUsers,
  findOne,
  updateUserRoleById,
  patchUserInfo
} = require('../factory');

module.exports = {
  index: async function(req, res) {
    try {
      let result = await findAllUsers()
      res.send(result)
    } catch (error) {
      res.status(500).send({
        message: error.message,
        reason: error
      })
    }
  },
  findOne: async function(req, res) {
    try {
      let result = await findOne(req.params.id)
      res.send(result)
    } catch (error) {
      res.status(500).send({
        message: error.message,
        reason: error
      })
    }
  },
  updateRole: async function (req, res) {
    let userId = req.params.id
    let roles = req.body.roles

    try {
      let result = await updateUserRoleById(userId, roles)
      res.send(result)
    } catch (error) {
      res.status(500).send({
        message: error.message,
        detail: error
      })
    }
  },
  updateInfo: async function (req, res) {
    let userId = req.params.id
    let userInfo = req.body

    try {
      let result = await patchUserInfo(userId, userInfo)
      res.send(result)
    } catch (error) {
      res.status(500).send({
        message: error.message,
        detail: error
      })
    }
  }
};
