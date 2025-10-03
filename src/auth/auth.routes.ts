import { Router } from "express";
import { signUp, login, logout } from "../auth/auth.controller";

const router = Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/logout", logout);

export { router as authRoutes };
