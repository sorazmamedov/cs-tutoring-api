import express from "express";
import verifyRoles from "../middleware/verifyRoles";
import Roles from "../config/roles";

import {
  createTimeslot,
  updateTimeslot,
  getTimeslots,
  deleteTimeslot,
} from "../controllers/timeslot";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getTimeslots))
  .post(makeCallback(createTimeslot));

router
  .route("/:id")
  .put(makeCallback(updateTimeslot))
  .delete(verifyRoles(Roles.Admin, Roles.Tutor), makeCallback(deleteTimeslot));

module.exports = router;
