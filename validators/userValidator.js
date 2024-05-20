const { body, validationResult } = require('express-validator');

const userValidator = [
  body('email')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("email can't be empty")
    .bail(),
  body('fullname')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("name can't be empty")
    .bail(),
  body('password')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("password can't be empty")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = userValidator;