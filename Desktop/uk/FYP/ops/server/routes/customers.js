const express = require("express");
const router = express.Router();
const { Customer } = require("../models/Customer");
const { cust_auth } = require("../middleware/cust_auth");

router.get("/cust_auth", cust_auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.customer.email,
    name: req.customer.name,
    lastname: req.customer.lastname,
    role: req.customer.role,
  });
});

router.post("/register", (req, res) => {
  const customer = new Customer(req.body);

  customer.save((err, customerData) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  //find the customer email
  Customer.findOne({ email: req.body.email }, (err, customer) => {
    if (!customer)
      return res.json({
        loginSuccess: false,
        message: "Auth Failed, customer not found",
      });

    //compare password
    customer.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "Wrong Password!" });
      }
    });

    //token generate
    customer.generateToken((err, customer) => {
      if (err) return res.status(400).send(err);
      res.cookie("x_auth", customer.token).status(200).json({
        loginSuccess: true,
      });
    });
  });
});

router.get("/logout", cust_auth, (req, res) => {
  Customer.findOneAndUpdate(
    { _id: req.customer._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
