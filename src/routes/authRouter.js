import express from "express";
import makeCallback from "../express-callback";
import { handleLogin } from "../controllers/authGoogle";
const router = express.Router();

router.route("/google").get(makeCallback(handleLogin));

module.exports = router;
