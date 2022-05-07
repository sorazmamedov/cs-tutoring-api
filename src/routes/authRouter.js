import express from "express";
import makeCallback from "../express-callback";
import { handleLogin, handleLogout } from "../controllers/auth";
const router = express.Router();

router.route("/login").get(makeCallback(handleLogin));

router.route("/logout").get(makeCallback(handleLogout));

module.exports = router;
