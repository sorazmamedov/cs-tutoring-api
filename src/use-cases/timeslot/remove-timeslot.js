import responseTxt from "../../config/responseTxt";
import Roles from "../../config/roles";

export default function makeRemoveTimeslot({ db }) {
  return async function removeTimeslot({ id, user }) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const timeslot = await db.timeslot.findById({ id });
    if (!timeslot) {
      throw new RangeError(`Timeslot ${responseTxt.notFound}`);
    }

    return await db.timeslot.remove({ id });
  };
}
