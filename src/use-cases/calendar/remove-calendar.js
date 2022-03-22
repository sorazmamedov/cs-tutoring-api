export default function makeRemoveCalendar({ db }) {
  return async function removeCalendar({ id }) {
    if (!id) {
      throw new Error("You must supply a valid id!");
    }

    const calendarToDelete = await db.findById({ id }, db.collections.calendar);
    if (!calendarToDelete) {
      throw new RangeError("Calendar not found.");
    }

    return {
      deletedCount: await db.remove(calendarToDelete, db.collections.calendar),
      message: "calendar deleted.",
    };
  };
}
