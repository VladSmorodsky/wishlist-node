import { Router } from "express";
import { signUp, login, logout } from "../controllers/auth.controller";
import {validateUserCreation} from '../validations/create.user'

const router = Router();

router.post("/sign-up", validateUserCreation(), signUp);
router.post("/login", login);
router.post("/logout", logout);

export { router as authRoutes };
