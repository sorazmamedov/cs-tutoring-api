export default function makeGrabActiveSemester({ db }) {
  return async function grabActiveSemester() {
    return await db.find({ active: true }, db.collections.semester);
  };
}
