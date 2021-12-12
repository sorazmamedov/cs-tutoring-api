export default function buildMakeSchedule({ Id, scheduleValidator }) {
  return function makeSchedule({
    scheduleId = Id.makeId(),
    tutorId,
    semesterId,
    day,
    startHour,
    endHour,
    sessionDuration,
  } = {}) {
    let { error } = scheduleValidator({
      scheduleId,
      tutorId,
      semesterId,
      day,
      startHour,
      endHour,
      sessionDuration,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getScheduleId: () => scheduleId,
      getTutorId: () => tutorId,
      getSemesterId: () => semesterId,
      getstartHour: () => startHour,
      getEndHour: () => endHour,
      getSessionDuration: () => sessionDuration,
    });
  };
}
