const { check, validationResult } = require("express-validator");
const User = require("../model/People");

const newCoursevalidators = [
  check("title").isLength({ min: 1 }).withMessage("Title is required").trim(),

  check("description").isLength({ min: 1 }).withMessage("Description is required").trim(),

  check("price").isLength({ min: 1 }).withMessage("Price is required").trim(),

  check("instructor").isLength({ min: 1 }).withMessage("Instructor is required").trim(),
];

const newCourseValidationHandler = function (req, res, next) {

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

module.exports = { newCoursevalidators, newCourseValidationHandler };
