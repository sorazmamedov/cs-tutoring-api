import makeAddUser from "./add-user";
import makeEditUser from "./edit-user";
import makeListUser from "./list-user"
import makeListUsers from "./list-users";
import makeRemoveUser from "./remove-user";
import db from "../../data-access";
import Roles from "../../config/roles";
import responseTxt from "../../config/responseTxt";

const addUser = makeAddUser({ db, Roles });
const editUser = makeEditUser({ db, Roles, responseTxt });
const listUser = makeListUser({ db, Roles, responseTxt });
const listUsers = makeListUsers({ db, Roles, responseTxt });
const removeUser = makeRemoveUser({ db, responseTxt });

const userService = Object.freeze({
  addUser,
  editUser,
  listUser,
  listUsers,
  removeUser,
});

export default userService;
export { addUser, editUser, listUser, listUsers, removeUser };
