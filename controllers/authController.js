const crypto = require("crypto");
const shortid = require("shortid");

var jwt = require("jsonwebtoken");

let User = require("../models/user");

function hashPassword(password, salt){
  let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  let value = hash.digest('hex');
  return value;
};

// hash password dengan salt baru yang di generate
function saltHashPassword(userpassword) {
  const salt = shortid.generate();; /** Gives us salt of length 16 */
  const hash = hashPassword(userpassword, salt);
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

    user.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          success : true,
          status : "OK",
          message: "user " + user.username + " berhasil ditambahkan"
        });
      }
    });
  },
  login: function(req, res, next) {
    if (req.body.username == "" || req.body.password == "") {
      res.json({
        success: false,
        status: "ERROR",
        message: "Username and Password can not empty"
      });
    } else {
      User.findOne({ username: req.body.username }, function(err, user) {
        if (err) {
          console.log("Error when trying to login : ", err);

          res.json({
            success: false,
            status: "ERROR",
            message: err
          });
        } else if (!user) {
          res.json({
            success: false,
            status: "ERROR",
            message: "Authentication failed. User not found."
          });
        } else if (user) {
          let reqPasswordData = hashPassword(req.body.password, user.salt);

          if(user.password != reqPasswordData){
            res.json({
              success: false,
              status: "ERROR",
              message: "Authentication failed. Wrong password."
            });
          } else if (user.isBanned) {
            res.json({
              success: false,
              status: "ERROR",
              message: "Authentication failed. User got banned. Please Call Admin."
            });
          } else {
            var token = jwt.sign(
              {
                username: user.username,
                email: user.email
              },
              process.env.JWT_SECRET,
              { expiresIn: '1d' }
            );

            res.json({
              success: true,
              msg: "login success",
              token: token
            });
          }
        }
      })
    }
  }
};
