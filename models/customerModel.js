const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT = 10;

let Schema = mongoose.Schema;

// Models Customer document
let customerSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: false},
  lastName: {type: String, required: false}
});

// Convert string password to hash
customerSchema.pre('save', function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// Note: Didn't use ES6 arrow syntax as it is giving lexical scope
// Compare hashes of two passwords
customerSchema.methods.comparePassword = function (userPassword, cb) {
  bcrypt.compare(userPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

let Customer = mongoose.model('Customer', customerSchema);

module.exports = {
  Customer: Customer
};
