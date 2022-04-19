import responseTxt from "../../config/responseTxt";

export default function makeRemoveAppointment({ db }) {
  return async function removeAppointment({ eventId, start, end }) {
    if (!eventId) {
      throw new Error(responseTxt.invalidId);
    }

    const timeSlot = await db.appointment.find({ eventId });
    if (!timeSlot) {
      throw new RangeError(`Appointment ${responseTxt.notFound}`);
    }

    return {
      deletedCount: await db.appointment.removeRange({ eventId, start, end }),
      message: "TimeSlot(s) deleted!",
    };
  };
}
