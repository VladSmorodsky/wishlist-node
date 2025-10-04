import { Request, Response } from "express";
import {validationResult} from 'express-validator'
import { User } from "../models/user";
import { hashPassword } from "../services/password.service";

export const signUp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  // console.dir(errors, { depth: null, colors: true });
  // console.log('Running test: should sign up a new user:', process.env.MONGODB_URI);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const {name, email, password} = req.body
  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    name, email, password: hashedPassword
  });
  res.status(201).json({ message: "User signed up successfully", user: {
    id: user._id, name: user.name, email: user.email
  } });
};

export const login = async (req: Request, res: Response) => {
  console.log("Login endpoint hit")
  res.status(200).json({ message: "User logged in successfully" });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: "User logged out successfully" });
};
