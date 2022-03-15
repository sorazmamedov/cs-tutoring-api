import express from "express";
import {
  createCourse,
  updateCourse,
  getCourses,
  deleteCourse,
} from "../controllers/course";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getCourses))
  .post(makeCallback(createCourse));

router
  .route("/:id")
  .put(makeCallback(updateCourse))
  .delete(makeCallback(deleteCourse));

module.exports = router;
