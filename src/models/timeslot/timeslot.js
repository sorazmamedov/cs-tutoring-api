export default function buildMakeTimeSlot({ Id, timeSlotValidator }) {
  return function makeTimeSlot({
    id = Id.makeId(),
    eventId,
    tutorId,
    semesterId,
    start,
    end,
    booked = false,
    appointmentId,
  } = {}) {
    let { error } = timeSlotValidator({
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
