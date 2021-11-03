export default function buildMakeTimeSlot({ Id, timeSlotValidator }) {
  return function makeTimeSlot({
    slotId = Id.makeId(),
    scheduleId,
    slotDate,
    sessionStart,
    sessionEnd,
  } = {}) {
    let { error } = timeSlotValidator({
      slotId,
      scheduleId,
      slotDate,
      sessionStart,
      sessionEnd,
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
