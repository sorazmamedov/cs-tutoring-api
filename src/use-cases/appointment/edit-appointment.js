import dateFns from "../../date";
import responseTxt from "../../config/responseTxt";
import Roles from "../../config/roles";
import makeAppointment from "../../models/appointment";
import mailer from "../../mailer";

export default function makeEditTimeslot({ db }) {
  return async function editTimeslot({ id, user, report, canceled, noShow }) {
    console.log(id, report, canceled, noShow);
    if (!user) {
      throw new Error(responseTxt.unauthorized);
    }

    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    //Admin cannot book an appointment, only delete
    if (user.roles.includes(Roles.Admin)) {
      throw new Error(responseTxt.accessDenied);
    }

    //Find the appointment
    const appointmentExists = await db.appointment.findById({ id });
    if (!appointmentExists) {
      throw new RangeError(`Appointment ${responseTxt.notFound}`);
    }

    //semester has to be active
    const semester = await db.semester.findById({
      id: appointmentExists.semesterId,
    });
    if (!semester.active) {
      throw new Error(responseTxt.accessDenied);
    }

    const timeslot = await db.timeslot.findById({
      id: appointmentExists.slotId,
    });
    if (!timeslot) {
      throw new RangeError(`Timeslot ${responseTxt.notFound}`);
    }

    //if student canceling appointment
    if (appointmentExists.studentId === user.id) {
      const hasPassed = dateFns.isPast(appointmentExists.end);
      if (
        !canceled ||
        hasPassed ||
        appointmentExists.noShow ||
        appointmentExists.canceled
      ) {
        console.log("Comes from here");
        throw new Error(responseTxt.accessDenied);
      }

      await db.timeslot.update({
        ...timeslot,
        booked: false,
        appointmentId: null,
      });

      await db.appointment.update({
        ...appointmentExists,
        canceled: true,
      });

      const student = await db.user.findById({
        id: appointmentExists.studentId,
      });
      const tutor = await db.user.findById({ id: appointmentExists.tutorId });

      const to = "sorazmamedov@neiu.edu, s.orazmamedov@gmail.com";
      const subject = responseTxt.cancellationTitle;
      const text =
        responseTxt.cancellationTxt +
        ` ${dateFns.format(appointmentExists.start, "PPPP")}.`;

      const response = await mailer.sendMail({ to, subject, text });
      mailer.close();
      console.log(response);
      return { message: "Appointment has been canceled" };
    }

    //noShow provided
    if (noShow !== undefined) {
      //setting to true is allowed after 15mins of start time
      if (noShow && !appointmentExists.sent) {
        const allowedTime = dateFns.addMinutes(appointmentExists.start, 15);
        const hasPassed = dateFns.isPast(allowedTime);
        if (!hasPassed) {
          throw new Error(
            `You can mark as a no show after ${dateFns.format(
              allowedTime,
              "h:mm bbb"
            )}`
          );
        }

        const updated = await db.appointment.update({
          ...appointmentExists,
          noShow: true,
        });

        console.log(updated);
        const student = await getUserInfo(updated.studentId, db);
        const course = await getCourseInfo(updated.courseId, db);

        return {
          id: updated.id,
          slotId: updated.slotId,
          student,
          course,
          start: updated.start,
          end: updated.end,
          report: updated.report,
          noShow: updated.noShow,
        };
      }

      //allow to change the no show back to false only if the appt time has not passed
      const hasPassed = dateFns.isPast(appointmentExists.end);
      console.log(hasPassed, appointmentExists.end);
      if (hasPassed) {
        throw new Error("Appointment time has expired");
      }

      const updated = await db.appointment.update({
        ...appointmentExists,
        noShow: false,
      });

      const student = await getUserInfo(updated.studentId, db);
      const course = await getCourseInfo(updated.courseId, db);

      return {
        id: updated.id,
        slotId: updated.slotId,
        student,
        course,
        start: updated.start,
        end: updated.end,
        report: updated.report,
        noShow: updated.noShow,
      };
    }

    if (report) {
      if (appointmentExists.sent) {
        throw new Error(responseTxt.accessDenied);
      }

      const modified = makeAppointment({ ...appointmentExists, report });

      const updated = await db.appointment.update({ ...modified });

      const student = await getUserInfo(updated.studentId, db);
      const course = await getCourseInfo(updated.courseId, db);

      return {
        id: updated.id,
        slotId: updated.slotId,
        student,
        course,
        start: updated.start,
        end: updated.end,
        report: updated.report,
        noShow: updated.noShow,
      };
    }

    throw new Error(responseTxt.missingInfo);
  };
}

async function getUserInfo(id, db) {
  const user = await db.user.findByIdAndProject({
    id,
    fields: ["firstName", "lastName"],
  });

  return user;
}

async function getCourseInfo(id, db) {
  const course = await db.course.findByIdAndProject({
    id,
    fields: ["courseName"],
  });

  return course.courseName;
}
