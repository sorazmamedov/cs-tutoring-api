import express from "express";
import Roles from "../config/roles";
import verifyRoles from "../middleware/verifyRoles";

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

router
  .route("/:id")
  .put(verifyRoles(Roles.Admin), makeCallback(updateCourse))
  .delete(verifyRoles(Roles.Admin), makeCallback(deleteCourse));

router
  .route("/semester/:semesterId")
  .post(verifyRoles(Roles.Admin), makeCallback(createCourse));

module.exports = router;
