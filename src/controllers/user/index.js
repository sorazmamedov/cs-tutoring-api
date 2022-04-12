import {
  addUser,
  editUser,
  listUser,
  listUsers,
  removeUser,
} from "../../use-cases/user";

import makeCreateUser from "./create-user";
import makeUpdateUser from "./update-user";
import makeGetUser from "./get-user";
import makeGetUsers from "./get-users";
import makeDeleteUser from "./delete-user";

const createUser = makeCreateUser({ addUser });
const updateUser = makeUpdateUser({ editUser });
const getUser = makeGetUser({ listUser });
const getUsers = makeGetUsers({ listUsers });
const deleteUser = makeDeleteUser({ removeUser });

const userController = Object.freeze({
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
});

export default userController;
export { createUser, updateUser, getUser, getUsers, deleteUser };
