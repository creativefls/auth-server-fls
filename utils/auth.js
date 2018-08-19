const crypto = require('crypto');
const shortid = require('shortid');

function hashPassword (password, salt){
  let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  let value = hash.digest('hex');
  return value;
}

// hash password dengan salt baru yang di generate
function saltHashPassword (userpassword) {
  const salt = shortid.generate();
  const hash = hashPassword(userpassword, salt);
  return {
    hash: hash,
    salt: salt
  };
}

module.exports = {
  hashPassword,
  saltHashPassword
}
