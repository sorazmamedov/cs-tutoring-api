export default function makeListAnnouncements({ db }) {
  return async function listAnnouncements({ semesterId: id }) {
    const semesterExists = await db.findById({ id }, db.collections.semester);
    if (!semesterExists) {
      throw new Error("You must supply valid semester id!");
    }

    return await db.findAll(db.collections.announcement, { semesterId: id });
  };
}
