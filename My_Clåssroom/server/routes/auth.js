import express from "express";
//import { register } from "../controllers/auth";

const router = express.Router();
// middleware
import {requireSignin} from "../middlewares";
//controllers
import {register, login, logout, currentUser, resetPassword} from '../controllers/auth';

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/current-user", requireSignin, currentUser);
//router.get("/send-email", sendTestEmail)
router. post("/reset-password", resetPassword);

module.exports = router;
