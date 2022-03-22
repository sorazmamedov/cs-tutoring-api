import makeCalendar from "../../models/calendar";

export default function makeEditCalendar({ db }) {
  return async function editCalendar({ id, ...changes }) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    const existing = await db.findById({ id }, db.collections.calendar);
    if (!existing) {
      throw new RangeError("Calendar not found.");
    }

    const calendar = makeCalendar({ ...existing, ...changes });

    const updated = await db.update(
      {
        id: calendar.getCalendarId(),
        tutorId: calendar.getTutorId(),
        semesterId: calendar.getSemesterId(),
        start: calendar.getStart(),
        end: calendar.getEnd(),
      },
      db.collections.calendar
    );

    return { ...existing, ...updated };
  };
}
