import makeTimeslot from "../../models/timeslot";

export default function makeAddTimeslot({ db, dateFns }) {
  return async function addTimeslot(slotInfo, repeatUntil) {
    const timeSlot = makeTimeslot({
      ...slotInfo,
      start: new Date(slotInfo.start),
      end: new Date(slotInfo.end),
    });

    const exists = await checkSlotExistence(timeSlot, db);
    if (exists) {
      return exists;
    }

    try {
      if (!repeatUntil) {
        return insertSlot(db, timeSlot);
      }

      let start = timeSlot.getStart();
      let end = timeSlot.getEnd();

      while (!dateFns.isAfter(end, repeatUntil)) {
        const timeSlot = makeTimeslot({ ...slotInfo, start, end });
        insertSlot(db, timeSlot);
        start = dateFns.addWeeks(start);
        end = dateFns.addWeeks(end);
      }
    } catch (error) {
      return error;
    }
  };
}

function insertSlot(db, timeSlot) {
  return db.timeslot.insert({
    id: timeSlot.getTimeSlotId(),
    eventId: timeSlot.getEventId(),
    tutorId: timeSlot.getTutorId(),
    semesterId: timeSlot.getSemesterId(),
    start: timeSlot.getStart(),
    end: timeSlot.getEnd(),
    booked: timeSlot.isBooked(),
    appointmentId: timeSlot.getAppointmentId(),
  });
}

async function checkSlotExistence(timeSlot, db) {
  const exists = await db.timeslot.findById({
    eventId: timeSlot.getEventId(),
  });

  if (exists) {
    return exists;
  }

  return false;
}
