import {
  addAdmin,
  editAdmin,
  listAdmins,
  removeAdmin,
} from "../../use-cases/admin";

import makeCreateAdmin from "./create-admin";
import makeDeleteAdmin from "./delete-admin";
import makeGetAdmins from "./get-admins";
import makeUpdateAdmin from "./update-admin";

const getAdmins = makeGetAdmins({ listAdmins });
const createAdmin = makeCreateAdmin({ addAdmin });
const updateAdmin = makeUpdateAdmin({ editAdmin });
const deleteAdmin = makeDeleteAdmin({ removeAdmin });

const adminController = Object.freeze({
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
});

export default adminController;
export { getAdmins, createAdmin, updateAdmin, deleteAdmin };
