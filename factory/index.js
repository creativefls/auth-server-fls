let User = require('../models/user');

async function findAllUsers () {
  let users = await User.find()

  return users.map(item => {
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
}

async function findOne (id) {
  return await User.findById(id);
}

async function updateUserRoleById (userId, roles = []) {
  return await User.findByIdAndUpdate(userId, { roles }, { new: true })
}

async function patchUserInfo (userId, data) {
  let userInfo = data
  console.log(data)
//  for (const key in payload) {
//    if (payload.hasOwnProperty(key)) {
//      userInfo['info.' + key] = payload[key]
//    }
//  }

  return await User.findByIdAndUpdate(userId, userInfo, { new: true })
}

module.exports = {
  findAllUsers,
  findOne,
  updateUserRoleById,
  patchUserInfo
}
