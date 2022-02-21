export default function buildMakeTimeSlot({ Id, timeSlotValidator }) {
  return function makeTimeSlot({
    slotId = Id.makeId(),
    scheduleId,
    slotDate,
    startHour,
    endHour,
    booked = false,
    appointmentId,
  } = {}) {
    let { error } = timeSlotValidator({
      slotId,
      scheduleId,
      slotDate,
      startHour,
      endHour,
      booked,
      appointmentId,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getSlotId: () => slotId,
      getScheduleId: () => scheduleId,
      getSlotDate: () => slotDate,
      getSessionStart: () => sessionStart,
      getSessionEnd: () => sessionEnd,
      isBooked: () => booked,
      book: () => (booked = true),
      unBook: () => (booked = false),
      getAppointmentId: () => appointmentId,
    });
  };
}
