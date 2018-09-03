let User = require('../models/user');

async function findAllUsers () {
  return await User.find()
}

module.exports = {
  findAllUsers
}
