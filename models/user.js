let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: String,
    isAdmin: { type: Boolean, default: false},
    isRangerNow: { type: Boolean, default: false},
    isActive: { type: Boolean, default: false},
    info: {
      fullName: String,
      nickName: String,
    }
  }, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
