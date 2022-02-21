export default function makeListSemesters({ db }) {
  return async function listSemesters() {
    return await db.findAll(db.collections.semester);
  };
}
