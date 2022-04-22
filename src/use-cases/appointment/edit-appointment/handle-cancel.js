import dateFns from "../../../date";
import mailer from "../../../mailer";
import responseTxt from "../../../config/responseTxt";

export default async function handleCancel({ db, appointment, timeslot, canceled }) {
  if (canceled === appointment.canceled) {
    throw new Error("Nothing to change")
  }

  const hasPassed = dateFns.isPast(appointment.end);
  if (!canceled || hasPassed || appointment.noShow || appointment.canceled) {
    throw new Error(responseTxt.accessDenied);
  }

  await db.timeslot.update({
    ...timeslot,
    booked: false,
    appointmentId: null,
  });

  await db.appointment.update({
    ...appointment,
    canceled: true,
  });

  const student = await db.user.findById({
    id: appointment.studentId,
  });
  const tutor = await db.user.findById({ id: appointment.tutorId });

  const to = "sorazmamedov@neiu.edu, pgkimmel@neiu.edu";
  const subject = responseTxt.cancellationTitle;
  const text =
    responseTxt.cancellationTxt +
    ` ${dateFns.format(appointment.start, "PPPP")}.`;

  const response = await mailer.sendMail({ to, subject, text });
  mailer.close();
  return { message: "Appointment has been canceled" };
}
