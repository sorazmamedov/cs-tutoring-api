import makeCalendar from "../../models/calendar";
export default function makeAddCalendar({ db }) {
  return async function addCalendar(calendarInfo) {
    console.log(calendarInfo);

    const calendar = makeCalendar(received, {
      context: {
        min: new Date(semesterExists.startDate),
        max: new Date(semesterExists.endDate),
      },
    });

    const semester = await checkSemesterExistence(calendarInfo.semesterId, db);

    const received = {
      ...calendarInfo,
      start: new Date(calendarInfo.start),
      end: new Date(calendarInfo.end),
    };

    const exists = await db.findById(
      { id: calendar.getCalendarId() },
      db.collections.calendar
    );

    if (exists) {
      return exists;
    }

    return db.insert(
      {
        id: calendar.getCalendarId(),
        tutorId: calendar.getTutorId(),
        semesterId: calendar.getSemesterId(),
        start: calendar.getStart(),
        end: calendar.getEnd(),
      },
      db.collections.calendar
    );
  };
}

async function checkSemesterExistence(id, db) {
  const semesterExists = await db.findById({ id }, db.collections.semester);
  if (!semesterExists) {
    throw new Error("You must supply valid semester id!");
  }

  return semester;
}

async function checkCalendarExistence(calendar, db) {
  const exists = await db.findById(
    { id: calendar.getCalendarId() },
    db.collections.calendar
  );

  if (exists) {
    return exists;
  }

  return false;
}
