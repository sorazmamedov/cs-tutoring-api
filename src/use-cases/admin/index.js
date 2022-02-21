import makeAddAdmin from "./add-admin";
import makeEditAdmin from "./edit-admin";
import makeListAdmins from "./list-admins";
import makeRemoveAdmin from "./remove-admin";
import db from "../../data-access";

const addAdmin = makeAddAdmin({ db });
const editAdmin = makeEditAdmin({ db });
const listAdmins = makeListAdmins({ db });
const removeAdmin = makeRemoveAdmin({ db });

const adminService = Object.freeze({
  addAdmin,
  editAdmin,
  listAdmins,
  removeAdmin,
});

export default adminService;
export { addAdmin, editAdmin, listAdmins, removeAdmin };
