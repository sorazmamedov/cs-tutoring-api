import makeAppointment from "../../models/appointment";

export default function makeEditTimeslot({ db, dateFns, Roles, responseTxt }) {
  return async function editTimeslot({ id, user, booked, courseId }) {
    if (!user) {
      throw new Error(responseTxt.unauthorized);
    }

    //Admin cannot book an appointment, only delete
    if (user.roles.includes(Roles.Admin)) {
      throw new Error(responseTxt.accessDenied);
    }

    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    //check if booked exists OR both should exist when booking
    if (booked === undefined || (booked && !courseId)) {
      throw new Error(responseTxt.missingInfo);
    }

    const timeslot = await db.timeslot.findById({ id });
    if (!timeslot) {
      throw new RangeError(`Timeslot ${responseTxt.notFound}`);
    }

    if (dateFns.isPast(new Date(timeslot.end))) {
      throw new Error(responseTxt.expired);
    }

    //semester has to be active
    const semester = await db.semester.findById({ id: timeslot.semesterId });
    if (!semester.active) {
      throw new Error(responseTxt.accessDenied);
    }

    //throw error if slot is already booked
    if (booked && timeslot.booked) {
      throw new Error(responseTxt.accessDenied);
    }

    //tutor cannot book his/her own slot
    if (timeslot.tutorId === user.id) {
      throw new Error(responseTxt.accessDenied);
    }

    let appointment;
    try {
      if (booked) {
        //check if the course exists
        const course = await db.course.findById({ id: courseId });
        if (!course) {
          throw new RangeError(`Course ${responseTxt.notFound}`);
        }

        //finally create appointment
        appointment = makeAppointment({
          slotId: timeslot.id,
          tutorId: timeslot.tutorId,
          studentId: user.id,
          courseId,
          semesterId: timeslot.semesterId,
          start: new Date(timeslot.start),
          end: new Date(timeslot.end),
        });

        await db.appointment.insert({
          id: appointment.getAppointmentId(),
          slotId: appointment.getSlotId(),
          tutorId: appointment.getTutorId(),
          studentId: appointment.getStudentId(),
          courseId: appointment.getCourseId(),
          semesterId: appointment.getSemesterId(),
          start: appointment.getStartDate(),
          end: appointment.getEndDate(),
          canceled: appointment.isCanceled(),
          noShow: appointment.isNoShow(),
          report: appointment.getReport(),
          sent: appointment.isSent(),
        });
      }
      //Changing booked = false only available thru appointment cancellation
      //Admin or Tutor can only delete the slot
      //when tutor marks appointment as a noShow nothing changes in slot
      //if booked = false =>

      const updated = await db.timeslot.update({
        ...timeslot,
        booked,
        appointmentId: booked ? appointment.getAppointmentId() : null,
      });

      return { ...timeslot, ...updated };
    } catch (error) {
      db.appointment.remove({ id: appointment.getAppointmentId() });
      throw error;
    }
  };
}
