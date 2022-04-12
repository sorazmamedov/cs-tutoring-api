import makeAddUser from "./add-user";
import makeEditUser from "./edit-user";
import makeListUser from "./list-user"
import makeListUsers from "./list-users";
import makeRemoveUser from "./remove-user";
import db from "../../data-access";
import Roles from "../../config/roles";

const addUser = makeAddUser({ db, Roles });
const editUser = makeEditUser({ db, Roles });
const listUser = makeListUser({ db });
const listUsers = makeListUsers({ db });
const removeUser = makeRemoveUser({ db });

const userService = Object.freeze({
  addUser,
  editUser,
  listUser,
  listUsers,
  removeUser,
});

export default userService;
export { addUser, editUser, listUser, listUsers, removeUser };
