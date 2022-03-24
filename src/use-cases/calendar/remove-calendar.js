import { removeTimeSlot } from "../timeslot";
export default function makeRemoveCalendar({ db }) {
  return async function removeCalendar({ id, deleteAll }) {
    deleteAll = deleteAll === "true";

    if (!id) {
      throw new Error("You must supply a valid id!");
    }

    const calendarToDelete = await db.findById({ id }, db.collections.calendar);

    if (!calendarToDelete) {
      throw new RangeError("Calendar not found.");
    }

    const eventId = calendarToDelete.eventId;
    const start = new Date(calendarToDelete.start);
    const end = new Date(calendarToDelete.end);

    try {
      let slotsDeleted = 0;
      let eventsDeleted = 0;

      if (deleteAll) {
        slotsDeleted = await removeTimeSlot({ eventId, start });
        eventsDeleted = await db.removeRange(
          { eventId, start },
          db.collections.calendar
        );
      } else {
        slotsDeleted = await removeTimeSlot({ eventId, start, end });
        eventsDeleted = await db.remove(
          calendarToDelete,
          db.collections.calendar
        );
      }

      return {
        calendar: { deletedCount: eventsDeleted },
        timeslot: { deletedCount: slotsDeleted.deletedCount },
      };
    } catch (error) {
      throw error;
    }
  };
}
