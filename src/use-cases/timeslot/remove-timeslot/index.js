import handleSendEmail from "./handle-sendEmail";

export default function makeRemoveTimeslot({
  db,
  dateFns,
  emailTypes,
  mailer,
  Roles,
  responseTxt,
}) {
  return async function removeTimeslot({ id, user, reason }) {
    if (!user) {
      throw new Error(responseTxt.unauthorized);
    }

    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const timeslot = await db.timeslot.findById({ id });
    if (!timeslot) {
      throw new RangeError(`Timeslot ${responseTxt.notFound}`);
    }

    //check if the user=tutor owns the slot or user=admin
    if (timeslot.tutorId !== user.id && !user.roles.includes(Roles.Admin)) {
      throw new Error(responseTxt.accessDenied);
    }

    if (dateFns.isPast(timeslot.end)) {
      throw new Error("Timeslot has expired!");
    }

    if (timeslot.appointmentId) {
      handleSendEmail({
        db,
        dateFns,
        emailTypes,
        mailer,
        reason,
        id: timeslot.appointmentId,
      });
    }

    return { deleted: await db.timeslot.remove({ id }) };
  };
}
