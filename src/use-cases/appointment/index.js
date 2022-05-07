import makeAddAppointment from "./add-appointment";
import makeEditAppointment from "./edit-appointment";
import makeListAppointments from "./list-appointments";
import makeRemoveAppointment from "./remove-appointment";
import db from "../../data-access";
import dateFns from "../../date";
import Roles from "../../config/roles";
import responseTxt from "../../config/responseTxt";

const addAppointment = makeAddAppointment({ db, dateFns });
const editAppointment = makeEditAppointment({
  db,
  dateFns,
  Roles,
  responseTxt,
});
const listAppointments = makeListAppointments({ db, Roles, responseTxt });
const removeAppointment = makeRemoveAppointment({ db, responseTxt });
const appointmentService = Object.freeze({
  addAppointment,
  editAppointment,
  listAppointments,
  removeAppointment,
});

export default appointmentService;
export { addAppointment, editAppointment, listAppointments, removeAppointment };
