export default function buildMakeTimeSlot({ Id, timeSlotValidator }) {
  return function makeTimeSlot({
    slotId = Id.makeId(),
    scheduleId,
    slotDate,
    startHour,
    endHour,
  } = {}) {
    let { error } = timeSlotValidator({
      slotId,
      scheduleId,
      slotDate,
      startHour,
      endHour,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getSlotId: () => slotId,
      getScheduleId: () => scheduleId,
      getSlotDate: () => slotDate,
      getSessionStart: () => sessionStart,
      getSessionEnd: () => sessionEnd,
    });
  };
}
