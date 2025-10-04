import bcrypt from "bcrypt";

const PASSWORD_SALT_ROUNDS = parseInt(
  process.env.PASSWORD_SALT_ROUNDS || "10",
  10,
);
const PASSWORD_SALT = process.env.PASSWORD_SALT || "";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password + PASSWORD_SALT, PASSWORD_SALT_ROUNDS);
};
