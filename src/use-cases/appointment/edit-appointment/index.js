import handleReport from "./handle-report";
import handleNoShow from "./handle-noshow";
import handleCancel from "./handle-cancel";

export default function makeEditAppointment({
  db,
  dateFns,
  Roles,
  responseTxt,
}) {
  return async function editAppointment({
    id,
    user,
    report,
    canceled,
    noShow,
  }) {
    if (!user) {
      throw new Error(responseTxt.unauthorized);
    }

    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    if (
      (report === undefined || typeof report !== "string") &&
      (canceled === undefined || typeof canceled !== "boolean") &&
      (noShow === undefined || typeof noShow !== "boolean")
    ) {
      throw new Error(responseTxt.missingInfo);
    }

    //Admin cannot edit an appointment, only delete
    if (user.roles.includes(Roles.Admin)) {
      throw new Error(responseTxt.accessDenied);
    }

    //Find the appointment
    const appointmentExists = await db.appointment.findById({ id });
    if (!appointmentExists) {
      throw new RangeError(`Appointment ${responseTxt.notFound}`);
    }

    //protect from forgery
    if (
      appointmentExists.tutorId !== user.id &&
      appointmentExists.studentId !== user.id
    ) {
      throw new Error(responseTxt.accessDenied);
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

    //canceled provided, only student can cancel the appointment
    if (appointmentExists.studentId === user.id) {
      return await handleCancel({
        db,
        appointment: appointmentExists,
        timeslot,
        canceled,
        dateFns,
        responseTxt,
      });
    }

    //noShow provided
    if (noShow !== undefined) {
      return await handleNoShow({
        db,
        appointment: appointmentExists,
        getCourseInfo,
        getUserInfo,
        noShow,
        dateFns,
      });
    }

    //report provided
    if (report) {
      return await handleReport({
        db,
        appointment: appointmentExists,
        getCourseInfo,
        getUserInfo,
        report,
        responseTxt,
      });
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
