import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcement";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getAnnouncements))
  .post(makeCallback(createAnnouncement));

router
  .route("/:id")
  .put(makeCallback(updateAnnouncement))
  .delete(makeCallback(deleteAnnouncement));

module.exports = router;
