export default function makeListCourses({ db }) {
  return async function listCourses({ semesterId: id }) {
    const semesterExists = await db.findById({ id }, db.collections.semester);
    if (!semesterExists) {
      throw new Error("You must supply valid semester id!");
    }

    return await db.findAll(db.collections.course, { semesterId: id });
  };
}
