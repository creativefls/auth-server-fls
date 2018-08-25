var jwt = require('jsonwebtoken');

let User = require('../models/user');
let { hashPassword, saltHashPassword } = require('../utils/auth')

module.exports = {
  // register user
  register: function(req, res, next) {
    let passwordData = saltHashPassword(req.body.password)
    let user = new User({
      username: req.body.email.split('@')[0] + '--' + Math.random().toString(36).substr(5),
      email: req.body.email,
      password: passwordData.hash,
      salt: passwordData.salt,
      info: {
        fullName: req.body.fullName
      }
    });

    user.save(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send({
          success: true,
          status: 'OK',
          message: 'user ' + user.info.fullName + ' berhasil ditambahkan'
        });
      }
    });
  },

  // login user
  login: function(req, res, next) {
    if (req.body.email == '' || req.body.password == '') {
      res.status(400).json({
        success: false,
        status: 'ERROR',
        message: 'Email and Password can not empty'
      });
    } else {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
          console.log('Error when trying to login : ', err);

          res.status(500).json({
            success: false,
            status: 'ERROR',
            message: err
          });
        } else if (!user) {
          res.status(400).json({
            success: false,
            status: 'ERROR',
            message: 'Authentication failed. User not found.'
          });
        } else if (user) {
          let reqPasswordData = hashPassword(req.body.password, user.salt);

          if(user.password != reqPasswordData){
            res.status(403).json({
              success: false,
              status: 'ERROR',
              message: 'Authentication failed. Wrong password.'
            });
          } else if (user.banned.status) {
            res.status(403).json({
              success: false,
              status: 'ERROR',
              message: 'Authentication failed. User got banned. Please Call Admin.'
            });
          } else {
            var token = jwt.sign(
              {
                sub: user.id,
                name: user.info.fullName,
                roles: user.roles
              },
              process.env.JWT_SECRET,
              { expiresIn: '1d' }
            );

            res.json({
              success: true,
              msg: 'login success',
              token: token
            });
          }
        }
      })
    }
  },

  // show user indormation based on token used in request header
  pingMe: function (req, res, next) {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(401).send(err)
      } else {
        User.findById(decoded.sub, function (err, user) {
          if (err) return res.status(500).send(err)
          res.json({
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              emailVerified: user.emailVerified,
              roles: user.roles,
              info: user.info,
              banned: user.banned,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            }
          })
        })
      }
    });
  },

  verifyEmail: function (req, res, next) {
    // TODO:
  }
};
