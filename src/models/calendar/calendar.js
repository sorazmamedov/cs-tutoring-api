export default function buildMakeCalendar({ Id, calendarValidator }) {
  return function makeCalendar({
    id = Id.makeId(),
    eventId,
    tutorId,
    semesterId,
    start,
    end,
    repeat,
  } = {}) {
    let { error } = calendarValidator({
      id,
      eventId,
      tutorId,
      semesterId,
      start,
      end,
      repeat,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getCalendarId: () => id,
      getEventId: () => eventId,
      getTutorId: () => tutorId,
      getSemesterId: () => semesterId,
      getStart: () => start,
      getEnd: () => end,
      doesRepeat: () => repeat,
    });
  };
}
