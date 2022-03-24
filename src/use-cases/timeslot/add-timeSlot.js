import makeTimeSlot from "../../models/timeslot";

export default function makeAddTimeSlot({ db, dateFns }) {
  return async function addTimeSlot(slotInfo, repeatUntil) {
    const timeSlot = makeTimeSlot({
      ...slotInfo,
      start: new Date(slotInfo.start),
      end: new Date(slotInfo.end),
    });

    const exists = await checkTimeSlotExistence(timeSlot, db);

    try {
      if (exists) {
        return exists;
      }

      if (!repeatUntil) {
        return insertSlot(db, timeSlot);
      }

      let start = timeSlot.getStart();
      let end = timeSlot.getEnd();

      while (!dateFns.isAfter(end, repeatUntil)) {
        const timeSlot = makeTimeSlot({ ...slotInfo, start, end });
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
  return db.insert(
    {
      id: timeSlot.getTimeSlotId(),
      eventId: timeSlot.getEventId(),
      tutorId: timeSlot.getTutorId(),
      semesterId: timeSlot.getSemesterId(),
      start: timeSlot.getStart(),
      end: timeSlot.getEnd(),
      booked: timeSlot.isBooked(),
      appointmentId: timeSlot.getAppointmentId(),
    },
    db.collections.timeslot
  );
}

async function checkTimeSlotExistence(timeSlot, db) {
  const exists = await db.findById(
    {
      eventId: timeSlot.getEventId(),
    },
    db.collections.timeslot
  );

  if (exists) {
    return exists;
  }

  return false;
}
