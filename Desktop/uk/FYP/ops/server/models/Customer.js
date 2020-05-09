const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const customerSchema = mongoose.Schema({
  name: { type: String, maxLength: 50 },
  email: { type: String, trim: true, unique: 1 },
  password: { type: String, minLength: 5 },
  lastname: { type: String, maxLength: 50 },
  role: { type: Number, default: 1 },
  token: { type: String },
  tokenExp: { type: Number },
});

customerSchema.pre("save", function (next) {
  var customer = this;
  if (customer.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(customer.password, salt, function (err, hash) {
        if (err) return next(err);
        customer.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

customerSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

customerSchema.methods.generateToken = function (cb) {
  var customer = this;
  var token = jwt.sign(customer._id.toHexString(), "secret");

  customer.token = token;
  customer.save(function (err, customer) {
    if (err) return cb(err);
    cb(null, customer);
  });
};

customerSchema.statics.findByToken = function (token, cb) {
  var customer = this;
  jwt.verify(token, "secret", function (err, decode) {
    customer.findOne({ _id: decode, token: token }, function (err, customer) {
      if (err) return cb(err);
      cb(null, customer);
    });
  });
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer };
