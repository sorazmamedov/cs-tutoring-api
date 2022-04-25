import dateFns from "../../../date";
import mailer from "../../../mailer";
import emailTypes from "../../../config/emailTypes";
import responseTxt from "../../../config/responseTxt";

export default async function handleCancel({
  db,
  appointment,
  timeslot,
  canceled,
}) {
  if (canceled === appointment.canceled) {
    throw new Error("Nothing to change");
  }

  const hasPassed = dateFns.isPast(appointment.end);
  if (!canceled || hasPassed || appointment.noShow || appointment.canceled) {
    throw new Error(responseTxt.accessDenied);
  }

  const slotPromise = db.timeslot.update({
    ...timeslot,
    booked: false,
    appointmentId: null,
  });

  const appointmentPromise = db.appointment.update({
    ...appointment,
    canceled: true,
  });

  await Promise.all([slotPromise, appointmentPromise]);

  const studentPromise = db.user.findById({
    id: appointment.studentId,
  });
  const tutorPromise = db.user.findById({ id: appointment.tutorId });

  const [student, tutor] = await Promise.all([studentPromise, tutorPromise]);

  const to = "sorazmamedov@neiu.edu";
  const subject = emailTypes.CancelTitle;
  const text = `${emailTypes.Cancel} ${date.format(
    appointment.start,
    "PPPP"
  )}.`;
  const html = `
      <p style="font-size: 15px; color: green; font-weight: 400;">
        ${emailTypes.Cancel} <strong>${date.format(
    appointment.start,
    "PPPP"
  )}</strong>
      </p>`;
  await mailer.sendMail({ to, subject, text, html });
  // if (response) {
  //   mailer.close();
  // }
  return { message: "Appointment has been canceled" };
}
