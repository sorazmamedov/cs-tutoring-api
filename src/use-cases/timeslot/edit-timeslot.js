import makeCalendar from "../../models/timeslot";

export default function makeEditCalendar({ db }) {
  return async function editCalendar({ id, ...changes }) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    const existing = await db.findById({ id }, db.collections.timeslot);
    if (!existing) {
      throw new RangeError("Calendar not found.");
    }

    const timeslot = makeCalendar({ ...existing, ...changes });

    const updated = await db.update(
      {
        id: timeslot.getCalendarId(),
        tutorId: timeslot.getTutorId(),
        semesterId: timeslot.getSemesterId(),
        start: timeslot.getStart(),
        end: timeslot.getEnd(),
      },
      db.collections.timeslot
    );

    return { ...existing, ...updated };
  };
}
