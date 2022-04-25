import responseTxt from "../../config/responseTxt";
import { removeTimeslots } from "../timeslot";

export default function makeRemoveCalendar({ db }) {
  return async function removeCalendar({ user, calId, deleteAll }) {
    deleteAll = deleteAll === "true";

    if (!user) {
      throw new Error(responseTxt.unauthorized);
    }

    if (!calId) {
      throw new Error(responseTxt.invalidId);
    }

    const calendarToDelete = await db.calendar.findById({ id: calId });

    if (!calendarToDelete) {
      throw new RangeError(`Calendar ${responseTxt.notFound}`);
    }

    if (calendarToDelete.tutorId !== user.id) {
      throw new Error(responseTxt.accessDenied);
    }

    const eventId = calendarToDelete.eventId;
    const start = new Date(calendarToDelete.start);
    const end = new Date(calendarToDelete.end);

    try {
      let slotsDeleted = 0;
      let eventsDeleted = 0;

      if (deleteAll) {
        removeTimeslots({ user, eventId, start });
        eventsDeleted = await db.calendar.removeRange({ eventId, start });
      } else {
        removeTimeslots({ user, eventId, start, end });
        eventsDeleted = await db.calendar.remove(calendarToDelete);
      }

      return {
        calendar: { deletedCount: eventsDeleted },
        timeslot: { deletedCount: slotsDeleted.deletedCount },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
