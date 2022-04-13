export default function makeRemoveTimeSlot({ db }) {
  return async function removeTimeSlot({ eventId, start, end }) {
    if (!eventId) {
      throw new Error("You must supply a valid id!");
    }

    const timeSlot = await db.find({ eventId }, db.collections.timeslot);
    if (!timeSlot) {
      throw new RangeError("Timeslot not found.");
    }

    return {
      deletedCount: await db.removeRange(
        { eventId, start, end },
        db.collections.timeslot
      ),
      message: "TimeSlot(s) deleted!",
    };
  };
}
