import express from "express";
import {
  createSemester,
  updateSemester,
  getSemesters,
  getActiveSemester
} from "../controllers/semester";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getSemesters))
  .post(makeCallback(createSemester));

router.route("/:id")
  .put(makeCallback(updateSemester));

router.route("/active")
  .get(makeCallback(getActiveSemester))


module.exports = router;
