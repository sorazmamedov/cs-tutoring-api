import express from "express";
import {
  getTutors,
  createTutor,
  updateTutor,
  deleteTutor,
} from "../controllers/tutor";
import makeCallback from "../express-callback";

const router = express.Router();

router.route("/")
    .get(makeCallback(getTutors))
    .post(makeCallback(createTutor));

router.route("/:id")
  .put(makeCallback(updateTutor))
  .delete(makeCallback(deleteTutor));

module.exports = router;
