import express from "express";
import { createCourse, updateCourse, getCourses } from "../controllers/course";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getCourses))
  .post(makeCallback(createCourse));

router.route("/:id")
  // .get(makeCallback(getCourses))
  .put(makeCallback(updateCourse));

module.exports = router;
