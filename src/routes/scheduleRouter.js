import express from "express";
import {
  createSchedule,
  updateSchedule,
  getSchedules,
} from "../controllers/schedule";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getSchedules))
  .post(makeCallback(createSchedule));

router
  .route("/:id")
  // .get(makeCallback(getSchedules))
  .put(makeCallback(updateSchedule));

module.exports = router;
