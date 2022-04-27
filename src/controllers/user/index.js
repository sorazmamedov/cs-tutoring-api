import responseTxt from "../../config/responseTxt";
import {
  addUser,
  listUser,
  listUsers,
  editUser,
} from "../../use-cases/user";

import makeCreateUser from "./create-user";
import makeGetUser from "./get-user";
import makeGetUsers from "./get-users";
import makeUpdateUser from "./update-user";

const createUser = makeCreateUser({ addUser });
const getUser = makeGetUser({ listUser, responseTxt });
const getUsers = makeGetUsers({ listUsers, responseTxt });
const updateUser = makeUpdateUser({ editUser, responseTxt });

const userController = Object.freeze({
  createUser,
  getUser,
  getUsers,
  updateUser,
});

export default userController;
export { createUser, getUser, getUsers, updateUser };
