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
const updateAppointment = makeUpdateAppointment({ editAppointment });
const getAppointments = makeGetAppointments({ listAppointments });
const deleteAppointment = makeDeleteAppointment({ removeAppointment });
const appointmentController = Object.freeze({
  createAppointment,
  updateAppointment,
  getAppointments,
  deleteAppointment,
});

export default appointmentController;
export { createAppointment, updateAppointment, getAppointments, deleteAppointment };
