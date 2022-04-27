import responseTxt from "../../config/responseTxt";
import {
  addAppointment,
  editAppointment,
  listAppointments,
  removeAppointment,
} from "../../use-cases/appointment";

import makeCreateAppointment from "./create-appointment";
import makeUpdateAppointment from "./update-appointment";
import makeGetAppointments from "./get-appointments";
import makeDeleteAppointment from "./delete-appointment";

const createAppointment = makeCreateAppointment({ addAppointment });
const deleteAppointment = makeDeleteAppointment({ removeAppointment });
const getAppointments = makeGetAppointments({ listAppointments, responseTxt });
const updateAppointment = makeUpdateAppointment({ editAppointment, responseTxt });
const appointmentController = Object.freeze({
  createAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
});

export default appointmentController;
export { createAppointment, updateAppointment, getAppointments, deleteAppointment };
