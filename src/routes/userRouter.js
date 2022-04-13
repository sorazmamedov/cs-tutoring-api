import express from "express";
import { getUser, getUsers, updateUser } from "../controllers/user";
import {
  createCalendar,
  deleteCalendar,
  getCalendars,
} from "../controllers/calendar";
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

router
  .route("/:id/calendars")
  .get(verifyRoles(Roles.Tutor), makeCallback(getCalendars))
  .post(verifyRoles(Roles.Tutor), makeCallback(createCalendar));

router
  .route("/:id/calendars/:calId")
  .delete(verifyRoles(Roles.Tutor), makeCallback(deleteCalendar));

module.exports = router;
