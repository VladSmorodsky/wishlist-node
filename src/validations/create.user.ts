import { body, ValidationError } from "express-validator";
import { User } from "../models/user";
import { RequestBodyValidationError } from "../errors/request.body.validation.error";

export const validateUserCreation = () => [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").normalizeEmail().isEmail().withMessage("Invalid email address")
    .custom(async (value) => {
        const existingUser = await User.findOne({ email: value});
        if (existingUser) {
            throw new RequestBodyValidationError({path: 'email'} as ValidationError, 'Email already in use');
        }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter"),
  body("passwordConfirmation").notEmpty().withMessage("Password confirmation is required")
    .custom((value, { req }) => {
        if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
        }
        return true;
    }),
];
