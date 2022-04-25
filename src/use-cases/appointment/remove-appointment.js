import responseTxt from "../../config/responseTxt";
import Roles from "../../config/roles";

export default function makeRemoveTimeslot({ db }) {
  return async function removeTimeslot({ id, user }) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const appointment = await db.appointment.findById({ id });
    if (!appointment) {
      throw new RangeError(`Appointment ${responseTxt.notFound}`);
    }

    return await db.appointment.remove({ id });
  };
}
