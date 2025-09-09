const { check, validationResult } = require("express-validator");
const User = require("../model/People");

const loginvalidators = [


  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim(),
    
    check("password")
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .trim(),


];

const loginValidationHandler = function (req, res, next) {
 
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    console.log(mappedErrors);
    res.status(200).json({
      errors: mappedErrors,
    });
  }
};

module.exports = { loginvalidators, loginValidationHandler };
