const { Customer } = require("../models/Customer");

let cust_auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  Customer.findByToken(token, (err, customer) => {
    if (err) throw err;
    if (!customer)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token;
    req.customer = customer;
    next();
  });
};

module.exports = { cust_auth };
