import { OAuth2Client } from "google-auth-library";
import db from "../../data-access";
import jwt from "jsonwebtoken";
import { addUser, editUser } from "../../use-cases/user";

import makeHandleLogin from "./handle-login";

const client = new OAuth2Client(process.env.CLIENT_ID);
const handleLogin = makeHandleLogin({ jwt, addUser, editUser, client, db });

const authController = Object.freeze({
  handleLogin,
});

export default authController;
export { handleLogin };
