export default function buildMakeCalendar({ Id, calendarValidator }) {
  return function makeCalendar({
    id = Id.makeId(),
    tutorId,
    semesterId,
    start,
    end,
    slots,
    repeat,
    range,
    context,
  } = {}) {
    let { error } = calendarValidator({
      id,
      tutorId,
      semesterId,
      start,
      end,
      slots,
      repeat,
      range,
      context,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getCalendarId: () => id,
      getTutorId: () => tutorId,
      getSemesterId: () => semesterId,
      getStart: () => start,
      getEnd: () => end,
    });
  };
}
