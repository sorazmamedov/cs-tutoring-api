import { Id } from "../../Id";
import buildMakeAppointment from "./appointment";
import { appointmentValidator } from "../../validator";

const makeAppointment = buildMakeAppointment({ Id, appointmentValidator });

export default makeAppointment;
