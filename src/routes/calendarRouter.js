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
  .get(makeCallback(getCalendars))
  .post(makeCallback(createCalendar));

router
  .route("/:id")
  .put(makeCallback(updateCalendar))
  .delete(verifyRoles(Roles.Admin, Roles.Tutor), makeCallback(deleteCalendar));

module.exports = router;
