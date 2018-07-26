let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false},
    salt: String,
    password: { type: String, required: true },
    roles: Array,
    banned: {
      status: { type: Boolean, default: false}, // is this user has been banned ?
      reason: String
    },
    info: {
      fullName: String,
      nickName: String,
    }
  }, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
