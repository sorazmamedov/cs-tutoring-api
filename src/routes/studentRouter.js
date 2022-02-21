import express from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getStudents))
  .post(makeCallback(createStudent));

router
  .route("/:id")
  .patch(makeCallback(updateStudent))
  .delete(makeCallback(deleteStudent));

module.exports = router;
