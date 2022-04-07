import express from "express";
import {
  createSchedule,
  updateSchedule,
  getSchedules,
} from "../controllers/schedule";
import makeCallback from "../express-callback";
import Roles from "../config/roles";
import verifyRoles from "../middleware/verifyRoles";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getSchedules))
  .post(verifyRoles(Roles.Admin), makeCallback(createSchedule));

router
  .route("/:id")
  .get(verifyRoles(Roles.Admin), makeCallback(getSchedules))
  .put(verifyRoles(Roles.Admin), makeCallback(updateSchedule));

module.exports = router;
