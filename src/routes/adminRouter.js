import express from "express";
import {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/admin";
import makeCallback from "../express-callback";

const router = express.Router();

router.route("/")
    .get(makeCallback(getAdmins))
    .post(makeCallback(createAdmin));

router.route("/:id")
  .patch(makeCallback(updateAdmin))
  .delete(makeCallback(deleteAdmin));

module.exports = router;
