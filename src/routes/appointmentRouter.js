import express from "express";
import verifyRoles from "../middleware/verifyRoles";
import Roles from "../config/roles";

import {
  createAppointment,
  updateAppointment,
  getAppointments,
  deleteAppointment,
} from "../controllers/appointment";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getAppointments))
  .post(makeCallback(createAppointment));

router
  .route("/:apptId")
  .put(makeCallback(updateAppointment))
  .delete(verifyRoles(Roles.Admin, Roles.Tutor), makeCallback(deleteAppointment));

module.exports = router;
