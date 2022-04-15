import express from "express";
import verifyRoles from "../middleware/verifyRoles";
import Roles from "../config/roles";
import {
  createCalendar,
  updateCalendar,
  getCalendars,
  deleteCalendar,
} from "../controllers/calendar";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(verifyRoles(Roles.Tutor), makeCallback(getCalendars))
  .post(verifyRoles(Roles.Tutor), makeCallback(createCalendar));

router
  .route("/:calId")
  .put(verifyRoles(Roles.Tutor), makeCallback(updateCalendar))
  .delete(verifyRoles(Roles.Tutor), makeCallback(deleteCalendar));

module.exports = router;
