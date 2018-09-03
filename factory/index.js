let User = require('../models/user');

async function findAllUsers () {
  return await User.find()
}

async function updateUserRoleById (userId, roles = []) {
  return await User.findByIdAndUpdate(userId, { roles }, { new: true })
}

module.exports = {
  findAllUsers,
  updateUserRoleById
}
