import { Request, Response } from "express";

export const signUp = async (req: Request, res: Response) => {
  res.status(201).json({ message: "User signed up successfully" });
};

export const login = async (req: Request, res: Response) => {
  res.status(200).json({ message: "User logged in successfully" });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: "User logged out successfully" });
};
