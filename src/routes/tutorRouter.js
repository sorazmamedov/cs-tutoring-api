import express from "express";
import {
  getTutors,
  createTutor,
  updateTutor,
  deleteTutor,
} from "../controllers/tutor";
import makeCallback from "../express-callback";
import verifyRoles from "../middleware/verifyRoles";
import Roles from "../config/roles";

const router = express.Router();

router.route("/")
    .get(makeCallback(getTutors))
    .post(verifyRoles(Roles.Admin), makeCallback(createTutor));

router.route("/:id")
  .put(verifyRoles(Roles.Admin), makeCallback(updateTutor))
  .delete(verifyRoles(Roles.Admin), makeCallback(deleteTutor));

module.exports = router;
