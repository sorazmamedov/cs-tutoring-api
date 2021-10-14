import { Id } from "../../Id";
import buildMakeAdmin from "./admin";
import { adminValidator } from "../../validator";

const makeAdmin = buildMakeAdmin({ Id, adminValidator });

export default makeAdmin;
