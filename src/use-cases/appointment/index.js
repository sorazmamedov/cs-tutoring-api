import makeAddAppointment from "./add-appointment";
import makeEditAppointment from "./edit-appointment";
import makeListAppointments from "./list-appointments";
import makeRemoveAppointment from "./remove-appointment";
import db from "../../data-access";
import dateFns from "../../date";

const addAppointment = makeAddAppointment({ db, dateFns });
const editAppointment = makeEditAppointment({ db });
const listAppointments = makeListAppointments({ db });
const removeAppointment = makeRemoveAppointment({ db });
const appointmentService = Object.freeze({
  addAppointment,
  editAppointment,
  listAppointments,
  removeAppointment,
});

export default appointmentService;
export {
  addAppointment,
  editAppointment,
  listAppointments,
  removeAppointment,
};
