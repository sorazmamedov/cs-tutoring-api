export default function buildMakeSchedule({ Id, scheduleValidator }) {
  return function makeSchedule({
    id = Id.makeId(),
    tutorId,
    semesterId,
    day,
    startHour,
    endHour,
    location = "TBA",
    isActive = false,
  } = {}) {
    let { error } = scheduleValidator({
      id,
      tutorId,
      semesterId,
      day,
      startHour,
      endHour,
      location,
      isActive,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getScheduleId: () => id,
      getTutorId: () => tutorId,
      getSemesterId: () => semesterId,
      getDay: () => day,
      getStartHour: () => startHour,
      getEndHour: () => endHour,
      getLocation: () => location,
      getIsActive: () => isActive,
    });
  };
}
