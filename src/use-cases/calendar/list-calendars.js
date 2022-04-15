import responseTxt from "../../config/responseTxt";

export default function makeListCalendars({ db }) {
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

    const semesterExists = await db.findById(
      { id: semesterId },
      db.collections.semester
    );
    if (!semesterExists) {
      throw new Error(`Semester ${responseTxt.notFound}`);
    }

    if (!semesterExists.active) {
      throw new Error(responseTxt.accessDenied);
    }

    return await db.findBetweenDates(db.collections.calendar, {
      semesterId,
      tutorId: user.id,
      start: new Date(start),
      end: new Date(end)
    });
  };
}
