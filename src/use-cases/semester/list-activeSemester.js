export default function makeListActiveSemester({ db }) {
  return async function listActiveSemester() {
    return await db.semester.find({ active: true });
  };
}
