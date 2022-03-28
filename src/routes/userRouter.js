import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user";
import makeCallback from "../express-callback";

const router = express.Router();

router
  .route("/")
  .get(makeCallback(getUsers))
  .post(makeCallback(createUser));

router
  .route("/:id")
  .patch(makeCallback(updateUser))
  .delete(makeCallback(deleteUser));

module.exports = router;
