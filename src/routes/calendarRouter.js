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
  .get(verifyRoles(Roles.Admin), makeCallback(getCalendars))
  .post(verifyRoles(Roles.Admin), makeCallback(createCalendar));

router
  .route("/:calId")
  .put(verifyRoles(Roles.Admin), makeCallback(updateCalendar))
  .delete(verifyRoles(Roles.Admin), makeCallback(deleteCalendar));

module.exports = router;
