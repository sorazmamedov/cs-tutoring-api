export default function makeRemoveAppointment({ db, responseTxt }) {
  return async function removeAppointment({ id, user }) {
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
