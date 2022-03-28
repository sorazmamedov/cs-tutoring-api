import Id from "../../Id";
import buildMakeUser from "./user";
import { userValidator } from "../../validator";

const makeUser = buildMakeUser({ Id, userValidator });

export default makeUser;
