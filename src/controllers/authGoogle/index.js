import client from "../../google-client";
import db from "../../data-access";
import jwt from "jsonwebtoken";
import responseTxt from "../../config/responseTxt";
import { addUser, editUser } from "../../use-cases/user";

import makeHandleLogin from "./handle-login";
import makeHandleLogout from "./handle-logout";

const handleLogin = makeHandleLogin({ jwt, addUser, editUser, client, db, responseTxt });
const handleLogout = makeHandleLogout();

const authController = Object.freeze({
  handleLogin,
  handleLogout,
});

export default authController;
export { handleLogin, handleLogout };
