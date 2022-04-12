import express from "express";
import { getUser, getUsers, updateUser } from "../controllers/user";
import makeCallback from "../express-callback";
import Roles from "../config/roles";
import verifyRoles from "../middleware/verifyRoles";

const router = express.Router();

router.route("/").get(makeCallback(getUsers));
router
  .route("/email/:email")
  .get(verifyRoles(Roles.Admin), makeCallback(getUser));
router
  .route("/:id")
  .get(verifyRoles(Roles.Admin), makeCallback(getUser))
  .put(makeCallback(updateUser));

module.exports = router;
