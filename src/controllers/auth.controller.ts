import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/user";
import { hashPassword } from "../services/password.service";
import { catchAsync } from "../config/catch.async";
import { RequestBodyValidationError } from "../errors/request.body.validation.error";

export const signUp = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    //TODO: move logic into service layer
    const errors = validationResult(req);

    if (errors && !errors.isEmpty()) {
      throw new RequestBodyValidationError(errors.array()[0]);
    }

    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User signed up successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  },
);

export const login = async (req: Request, res: Response) => {
  console.log("Login endpoint hit");
  res.status(200).json({ message: "User logged in successfully" });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: "User logged out successfully" });
};
