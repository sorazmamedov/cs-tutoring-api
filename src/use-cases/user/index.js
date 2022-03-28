import makeAddUser from "./add-user";
import makeEditUser from "./edit-user";
import makeListUsers from "./list-users";
import makeRemoveUser from "./remove-user";
import db from "../../data-access";

const addUser = makeAddUser({ db });
const editUser = makeEditUser({ db });
const listUsers = makeListUsers({ db });
const removeUser = makeRemoveUser({ db });

const userService = Object.freeze({
  addUser,
  editUser,
  listUsers,
  removeUser,
});

export default userService;
export { addUser, editUser, listUsers, removeUser };
