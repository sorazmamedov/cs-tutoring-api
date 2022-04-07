import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcement";
import makeCallback from "../express-callback";
import Roles from "../config/roles";
import verifyRoles from "../middleware/verifyRoles";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getAnnouncements))
  .post(verifyRoles(Roles.Admin), makeCallback(createAnnouncement));

router
  .route("/:id")
  .put(verifyRoles(Roles.Admin), makeCallback(updateAnnouncement))
  .delete(verifyRoles(Roles.Admin), makeCallback(deleteAnnouncement));

module.exports = router;
