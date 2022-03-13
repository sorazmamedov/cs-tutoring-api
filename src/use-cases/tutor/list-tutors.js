export default function makeListTutors({ db }) {
  return async function listTutors({ semesterId: id }) {
    if (id) {
      const existing = await db.findById({ id }, db.collections.semester);
      if (!existing) {
        throw new RangeError("Semester not found.");
      }
      return await db.findAll(db.collections.tutor, { activeSemesters: id });
    }

    return await db.findAll(db.collections.tutor);
  };
}
