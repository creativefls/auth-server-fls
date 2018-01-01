let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: String,
    isAdmin: { type: Boolean, default: false}, // is this user a mimin ?
    isActive: { type: Boolean, default: false}, // is this user active in using this system ?
    isBanned: { type: Boolean, default: false}, // is this user has been banned ?
    info: {
      fullName: String,
      nickName: String,
    }
  }, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);

// --------- Explanation ---------

// isActive adalah user itu aktif atau tidak. ini digunakan untuk sistem membantu ferivikasi. untuk mengaktifkan akun user akan diberikan suatu cara tertentu untuk mengaktifkan akun miliknya. contoh: diberi salt untuk membuat password

// isBanned adalah kondisi user itu melakukan pelanggaran. banned dilakukan oleh admin. user yang dibanned akan memiliki status banned yang berarti user itu sengaja dibanned olah admin