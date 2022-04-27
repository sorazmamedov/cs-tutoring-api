export default function makeListTimeslots({ db, Roles, responseTxt }) {
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
      start: new Date(start),
      end: new Date(end),
    });
  };
}
