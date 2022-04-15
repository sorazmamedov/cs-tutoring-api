import responseTxt from "../../config/responseTxt";
import Roles from "../../config/roles";
import makeAppointment from "../../models/appointment";

export default function makeEditTimeslot({ db }) {
  return async function editTimeslot({ id, user, booked, courseId }) {
    console.log("Inside Edit TimeSlot:");
    console.log("ID: " + id);
    console.log("Booked: " + booked);
    console.log("CourseId: " + courseId);
    console.log("USER: " + user.id + " " + user.roles);

    if (!user) {
      throw new Error(responseTxt.unauthorized);
    }

    //Admin cannot book an appointment, only delete
    if (user.roles.includes(Roles.Admin)) {
      console.log("Because you are an Admin");
      throw new Error(responseTxt.accessDenied);
    }

    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    //check if booked exists OR both should exist when booking
    if (booked === undefined || (booked && !courseId)) {
      console.log("missing");
      throw new Error(responseTxt.missingInfo);
    }

    const timeslot = await db.findById({ id }, db.collections.timeslot);
    if (!timeslot) {
      throw new RangeError(`Timeslot ${responseTxt.notFound}`);
    }

    //semester has to be active
    const semester = await db.findById(
      { id: timeslot.semesterId },
      db.collections.semester
    );
    if (!semester.active) {
      console.log(
        "Semester is inactive: " + semester.active + " " + timeslot.semesterId
      );
      throw new Error(responseTxt.accessDenied);
    }

    //throw error if slot is already booked
    if (booked && timeslot.booked) {
      console.log("It is already booked");
      throw new Error(responseTxt.accessDenied);
    }

    //tutor cannot book his/her own slot
    if (timeslot.tutorId === user.id) {
      console.log("You cannot book your own slot");
      throw new Error(responseTxt.accessDenied);
    }

    let appointment;
    try {
      if (booked) {
        //check if the course exists
        const course = await db.findById(
          { id: courseId },
          db.collections.course
        );
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

        await db.insert(
          {
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
          },
          db.collections.appointment
        );
      }
      //Changing booked = false only available thru appointment cancellation
      //Admin or Tutor can only delete the slot
      //when tutor marks appointment as a noShow nothing changes in slot
      //if booked = false =>

      const updated = await db.update(
        {
          ...timeslot,
          booked,
          appointmentId: booked ? appointment.getAppointmentId() : null,
        },
        db.collections.timeslot
      );

      return { ...timeslot, ...updated };
    } catch (error) {
      console.log(error);
      db.removeAll(
        { id: appointment.getAppointmentId() },
        db.collections.appointment
      );
      throw error;
    }
  };
}
