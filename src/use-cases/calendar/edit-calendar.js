import responseTxt from "../../config/responseTxt";
import makeCalendar from "../../models/calendar";

export default function makeEditCalendar({ db }) {
  return async function editCalendar({ id, ...changes }) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const existing = await db.calendar.findById({ id });
    if (!existing) {
      throw new RangeError(`Calendar ${responseTxt.notFound}`);
    }

    const calendar = makeCalendar({ ...existing, ...changes });

    const updated = await db.calendar.update({
      id: calendar.getCalendarId(),
      tutorId: calendar.getTutorId(),
      semesterId: calendar.getSemesterId(),
      start: calendar.getStart(),
      end: calendar.getEnd(),
    });

    return { ...existing, ...updated };
  };
}
