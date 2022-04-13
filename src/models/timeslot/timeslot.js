export default function buildMakeTimeslot({ Id, timeslotValidator }) {
  return function makeTimeslot({
    id = Id.makeId(),
    eventId,
    tutorId,
    semesterId,
    start,
    end,
    booked = false,
    appointmentId,
  } = {}) {
    let { error } = timeslotValidator({
      id,
      eventId,
      tutorId,
      semesterId,
      start,
      end,
      booked,
      appointmentId,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getTimeSlotId: () => id,
      getEventId: () => eventId,
      getTutorId: () => tutorId,
      getSemesterId: () => semesterId,
      getStart: () => start,
      getEnd: () => end,
      isBooked: () => booked,
      book: () => (booked = true),
      unBook: () => (booked = false),
      getAppointmentId: () => appointmentId,
    });
  };
}
