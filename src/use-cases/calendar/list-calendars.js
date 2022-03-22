export default function makeListCalendars({ db }) {
  return async function listCalendars({ semesterId, tutorId }) {
    const id = semesterId;
    const semesterExists = await db.findById({ id }, db.collections.semester);
    if (!semesterExists) {
      throw new Error("You must supply valid semester id!");
    }

    return await db.findAll(db.collections.calendar, { semesterId, tutorId });
  };
}
