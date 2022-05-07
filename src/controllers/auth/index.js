import db from "../../data-access";
import jwt from "jsonwebtoken";
import responseTxt from "../../config/responseTxt";

import makeHandleLogin from "./handle-login";
import makeHandleLogout from "./handle-logout";

const handleLogin = makeHandleLogin({ jwt, db, responseTxt });
const handleLogout = makeHandleLogout();

const authController = Object.freeze({
  handleLogin,
  handleLogout,
});

export default authController;
export { handleLogin, handleLogout };
