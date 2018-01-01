let crypto = require("crypto");

let User = require("../models/user");

function genRandomString(length){
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
};

function hashPassword(password, salt){
  let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  let value = hash.digest('hex');
  return value;
};

function saltHashPassword(userpassword) {
  let salt = genRandomString(16); /** Gives us salt of length 16 */
  let hash = hashPassword(userpassword, salt);
  return {
    hash: hash,
    salt: salt
  };
}

module.exports = {
  register: function(req, res, next) {
    passwordData = saltHashPassword(req.body.password)
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: passwordData.hash,
      salt: passwordData.salt,
      info: {
        fullName: req.body.fullName
      }
    });
    var result = {
      success : false,
      status : "ERROR",
      user: user
    }
    user.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        result.success = true
        result.status = "OK"
        res.send(result);
      }
    });
  }
};
