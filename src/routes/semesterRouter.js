import express from "express";
import {
  createSemester,
  updateSemester,
  getSemesters,
} from "../controllers/semester";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getSemesters))
  .post(makeCallback(createSemester));

router.route("/:id")
  .patch(makeCallback(updateSemester));

module.exports = router;
