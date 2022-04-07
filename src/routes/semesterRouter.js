import express from "express";
import verifyRoles from "../middleware/verifyRoles";
import Roles from "../config/roles";

import {
  createSemester,
  updateSemester,
  getSemesters,
  getActiveSemester,
} from "../controllers/semester";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(verifyRoles(Roles.Admin), makeCallback(getSemesters))
  .post(verifyRoles(Roles.Admin), makeCallback(createSemester));

router.route("/active").get(makeCallback(getActiveSemester));

router
  .route("/:id")
  .put(verifyRoles(Roles.Admin), makeCallback(updateSemester));

module.exports = router;
