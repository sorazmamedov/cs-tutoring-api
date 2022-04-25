import responseTxt from "../../config/responseTxt";
import { removeTimeslot } from ".";

export default function makeRemoveTimeslots({ db }) {
  return async function removeTimeslots({ user, eventId, start, end }) {
    try {
      if (!eventId) {
        throw new Error(responseTxt.invalidId);
      }

      if (!user) {
        throw new Error(responseTxt.unauthorized);
      }

      const timeslots = await db.timeslot.findBetweenDates({
        eventId,
        start,
        end,
      });
      console.log(timeslots);
      if (!timeslots.length) {
        return;
      }

      let slotPromises = timeslots.map(slot => removeTimeslot({ id: slot.id, user }))
      await Promise.all(slotPromises)

      return {
        deletedCount: await db.timeslot.removeRange({ eventId, start, end }),
        message: "TimeSlot(s) deleted!",
      };
    } catch (error) {
      console.log(error);
    }
  };
}
