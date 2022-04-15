import responseTxt from "../../config/responseTxt";
import makeCalendar from "../../models/calendar";
import { makeEvent } from "../../models/calendar";
import { addTimeslot } from "../timeslot";

export default function makeAddCalendar({ db, dateFns }) {
  return async function addCalendar(eventInfo) {
    const semester = await checkSemesterExistence(eventInfo.semesterId, db);

    const min = new Date(semester.startDate);
    const max = new Date(semester.endDate);

    const event = makeEvent(eventInfo, { context: { min, max } });

    const exists = await checkCalendarExistence(event, db, dateFns);

    if (exists) {
      return exists;
    }

    try {
      if (!event.doesRepeat()) {
        const calendar = createCalendar({ event });
        const result = await insertCalendar(db, calendar);
        await createSlots(event);
        return result;
      }

      let start = dateFns.parseISO(event.getStart());
      let end = dateFns.parseISO(event.getEnd());
      let repeatUntil = dateFns.set(event.getRepeatUntil(), {
        hours: end.getHours(),
        minutes: end.getMinutes(),
      });

      while (!dateFns.isAfter(end, repeatUntil)) {
        const calendar = createCalendar({ start, end, event });
        await insertCalendar(db, calendar);
        start = dateFns.addWeeks(start);
        end = dateFns.addWeeks(end);
      }

      await createSlots(event, repeatUntil);

      return { success: "Successfully created!" };
    } catch (error) {
      db.removeAll({ eventId: event.getEventId() }, db.collections.calendar);
      db.removeAll({ eventId: event.getEventId() }, db.collections.timeslot);
      throw error;
    }
  };
}

async function createSlots(event, repeatUntil) {
  for (const item of event.getSlots()) {
    await addTimeslot(
      {
        eventId: event.getEventId(),
        tutorId: event.getTutorId(),
        semesterId: event.getSemesterId(),
        start: item.start,
        end: item.end,
      },
      repeatUntil
    );
  }
}

function createCalendar({ start, end, event }) {
  return makeCalendar({
    eventId: event.getEventId(),
    tutorId: event.getTutorId(),
    semesterId: event.getSemesterId(),
    start: start ?? new Date(event.getStart()),
    end: end ?? new Date(event.getEnd()),
    repeat: event.doesRepeat(),
  });
}

function insertCalendar(db, calendar) {
  return db.insert(
    {
      id: calendar.getCalendarId(),
      eventId: calendar.getEventId(),
      tutorId: calendar.getTutorId(),
      semesterId: calendar.getSemesterId(),
      start: calendar.getStart(),
      end: calendar.getEnd(),
      repeat: calendar.doesRepeat(),
    },
    db.collections.calendar
  );
}

async function checkSemesterExistence(id, db) {
  const semesterExists = await db.findById({ id }, db.collections.semester);
  if (!semesterExists) {
    throw new Error(responseTxt.invalidSemesterId);
  }

  if (!semesterExists.active) {
    throw new Error(responseTxt.accessDenied);
  }

  return semesterExists;
}

async function checkCalendarExistence(event, db, dateFns) {
  const exists = await db.findById(
    {
      eventId: event.getEventId(),
      start: dateFns.parseISO(event.getStart()),
      end: dateFns.parseISO(event.getEnd()),
    },
    db.collections.calendar
  );

  if (exists) {
    return exists;
  }

  return false;
}
