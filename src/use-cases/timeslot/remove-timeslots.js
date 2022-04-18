import responseTxt from "../../config/responseTxt";

export default function makeRemoveTimeslot({ db }) {
  return async function removeTimeslot({ eventId, start, end }) {
    if (!eventId) {
      throw new Error(responseTxt.invalidId);
    }

    const timeSlot = await db.timeslot.find({ eventId });
    if (!timeSlot) {
      throw new RangeError(`Timeslot ${responseTxt.notFound}`);
    }

    return {
      deletedCount: await db.timeslot.removeRange({ eventId, start, end }),
      message: "TimeSlot(s) deleted!",
    };
  };
}
