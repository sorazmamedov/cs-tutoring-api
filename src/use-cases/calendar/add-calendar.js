import makeCalendar from "../../models/calendar";
import { makeEvent } from "../../models/calendar";
import { addTimeslot } from "../timeslot";

export default function makeAddCalendar({ db, dateFns, responseTxt }) {
  return async function addCalendar(eventInfo) {
    const tutor = await db.user.findById({ id: eventInfo.tutorId });
    if (!tutor?.isActive) {
      throw new Error(responseTxt.accessDenied);
    }

    const semester = await checkSemesterExistence(eventInfo.semesterId, db);
    const min = semester.startDate;
    const max = semester.endDate;

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
      db.calendar.removeAll({ eventId: event.getEventId() });
      db.timeslot.removeAll({ eventId: event.getEventId() });
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
  return db.calendar.insert({
    id: calendar.getCalendarId(),
    eventId: calendar.getEventId(),
    tutorId: calendar.getTutorId(),
    semesterId: calendar.getSemesterId(),
    start: calendar.getStart(),
    end: calendar.getEnd(),
    repeat: calendar.doesRepeat(),
  });
}

async function checkSemesterExistence(id, db) {
  const semesterExists = await db.semester.findById({ id });
  if (!semesterExists) {
    throw new Error(responseTxt.invalidSemesterId);
  }

  if (!semesterExists.active) {
    throw new Error(responseTxt.accessDenied);
  }

  return semesterExists;
}

async function checkCalendarExistence(event, db, dateFns) {
  const exists = await db.calendar.findById({
    eventId: event.getEventId(),
    start: dateFns.parseISO(event.getStart()),
    end: dateFns.parseISO(event.getEnd()),
  });

  if (exists) {
    return exists;
  }

  return false;
}
