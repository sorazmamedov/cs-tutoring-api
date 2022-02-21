export default function makeListStudents({ db }) {
  return async function listStudents() {
    return await db.findAll(db.collections.student);
  };
}
