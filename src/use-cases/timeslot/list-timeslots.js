import Roles from "../../config/roles";
import responseTxt from "../../config/responseTxt";

export default function makeListTimeslots({ db }) {
  return async function listTimeslots({ user, semesterId, start, end }) {
    if (!user) {
      throw new Error(responseTxt.unauthorized);
    }

    if (!start || !end) {
      throw new Error(responseTxt.missingInfo);
    }

    if (!semesterId) {
      throw new Error(responseTxt.invalidSemesterId);
    }

    const id = semesterId;
    const semesterExists = await db.semester.findById({ id });
    if (!semesterExists) {
      throw new RangeError(`Semester ${responseTxt.notFound}`);
    }

    const isAdmin = user?.roles.includes(Roles.Admin);
    if (!semesterExists.active && !isAdmin) {
      throw new Error(responseTxt.accessDenied);
    }

    return await db.timeslot.findBetweenDates({
      semesterId,
      start: new Date(start),
      end: new Date(end),
    });
  };
}
