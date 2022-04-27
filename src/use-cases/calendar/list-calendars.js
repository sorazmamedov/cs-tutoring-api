export default function makeListCalendars({ db, responseTxt }) {
  return async function listCalendars({ semesterId, user, start, end }) {
    if (!user) {
      throw new Error(responseTxt.unauthorized);
    }

    if (!start || !end) {
      throw new Error(responseTxt.missingInfo);
    }

    if (!semesterId) {
      throw new Error(responseTxt.invalidSemesterId);
    }

    const semesterExists = await db.semester.findById({ id: semesterId });
    if (!semesterExists) {
      throw new Error(`Semester ${responseTxt.notFound}`);
    }

    if (!semesterExists.active) {
      throw new Error(responseTxt.accessDenied);
    }

    return await db.calendar.findBetweenDates({
      semesterId,
      tutorId: user.id,
      start: new Date(start),
      end: new Date(end),
    });
  };
}
