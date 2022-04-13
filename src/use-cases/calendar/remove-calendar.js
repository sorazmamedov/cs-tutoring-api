import responseTxt from "../../config/responseTxt";
import ROLES from "../../config/roles";
import { removeTimeslot } from "../timeslot";

export default function makeRemoveCalendar({ db }) {
  return async function removeCalendar({ user, id, calId, deleteAll }) {
    deleteAll = deleteAll === "true";

    if (!user) {
      throw new Error(responseTxt.unauthorized);
    }

    if (id && user.id !== id) {
      throw new Error(responseTxt.accessDenied);
    }

    if (!calId) {
      throw new Error(responseTxt.invalidId);
    }

    const allowedRoles = [ROLES.Admin, ROLES.Tutor];
    if (!user?.roles.some((role) => allowedRoles.includes(role))) {
      throw new Error(responseTxt.accessDenied);
    }

    const calendarToDelete = await db.findById(
      { id: calId },
      db.collections.calendar
    );

    if (!calendarToDelete) {
      throw new RangeError(`Calendar ${responseTxt.notFound}`);
    }

    const eventId = calendarToDelete.eventId;
    const start = new Date(calendarToDelete.start);
    const end = new Date(calendarToDelete.end);

    try {
      let slotsDeleted = 0;
      let eventsDeleted = 0;

      if (deleteAll) {
        slotsDeleted = await removeTimeslot({ eventId, start });
        eventsDeleted = await db.removeRange(
          { eventId, start },
          db.collections.calendar
        );
      } else {
        slotsDeleted = await removeTimeslot({ eventId, start, end });
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
