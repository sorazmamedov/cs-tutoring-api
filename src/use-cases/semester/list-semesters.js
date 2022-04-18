export default function makeListSemesters({ db }) {
  return async function listSemesters() {
    return await db.semester.findAll();
  };
}
