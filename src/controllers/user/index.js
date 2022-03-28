import {
  addUser,
  editUser,
  listUsers,
  removeUser,
} from "../../use-cases/user";

import makeCreateUser from "./create-user";
import makeDeleteUser from "./delete-user";
import makeGetUsers from "./get-users";
import makeUpdateUser from "./update-user";

const getUsers = makeGetUsers({ listUsers });
const createUser = makeCreateUser({ addUser });
const updateUser = makeUpdateUser({ editUser });
const deleteUser = makeDeleteUser({ removeUser });

const userController = Object.freeze({
  getUsers,
  createUser,
  updateUser,
  deleteUser,
});

export default userController;
export { getUsers, createUser, updateUser, deleteUser };
