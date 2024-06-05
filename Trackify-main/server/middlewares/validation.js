import { body, validationResult } from "express-validator";
import User from "../models/userSchema.js";

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const userValidation = [
  body("email")
    .exists()
    .withMessage("Email should be given")
    .isEmail()
    .withMessage("Enter the valid Email")
    .trim()
    .normalizeEmail()
    .custom(async (value, { req }) => {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) {
        throw new Error(`${value} is already used`);
      }
      return true;
    }),

  body("password")
    .exists()
    .withMessage("password should be given")
    .trim()
    .isLength({ min: 6 }, { max: 16 })
    .withMessage("password length should be between 6 and 16"),
  body("firstName").exists().trim().escape().isAlpha(),
  body("lastName").exists().trim().escape().isAlpha(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.body.firstName = capitalize(req.body.firstName);
      req.body.lastName = capitalize(req.body.lastName);
      next();
    } else {
      res.status(400).send(errors);
    }
  },
];
