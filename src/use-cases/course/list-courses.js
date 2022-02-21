export default function makeListCourses({ db }) {
  return async function listCourses() {
    return await db.findAll(db.collections.course);
  };
}
