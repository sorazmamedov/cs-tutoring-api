import emailTypes from "../../../config/emailTypes";
import date from "../../../date";
import mailer from "../../../mailer";

export default async function handleSendEmail({ db, reason, id }) {
  try {
    const appointment = await db.appointment.findById({ id });

    if (appointment) {
      const deletedPromise = db.appointment.remove({ id: appointment.id });
      const tutorPromise = db.user.findById({ id: appointment.tutorId });
      const studentPromise = db.user.findById({ id: appointment.studentId });
      const [deletedAppt, tutor, student] = await Promise.all([
        deletedPromise,
        tutorPromise,
        studentPromise,
      ]);

      const to = "sorazmamedov@neiu.edu, sorazmamedov@gmail.com";
      const subject = emailTypes.CancelTitle;
      const text = `${emailTypes.Cancel} ${date.format(
        appointment.start,
        "PPPP"
      )}.\n${student.firstName}\n${reason}`;
      const html = `
        <p style="font-size: 15px; color: green; font-weight: 400;">
          ${emailTypes.Cancel} <strong>${date.format(
        appointment.start,
        "PPPP"
      )}</strong>
        </p>
        <p style="font-size: 15px; font-weight: 300;">
            ${student.firstName}
          ${reason}
        </>`;
      await mailer.sendMail({ to, subject, text, html });
      // if (response) {
      //   mailer.close();
      // }
    }
  } catch (error) {
    console.log(error);
  }
}
