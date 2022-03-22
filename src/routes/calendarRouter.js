import express from "express";
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
  .delete(makeCallback(deleteCalendar));

module.exports = router;
