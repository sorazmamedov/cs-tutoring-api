import makeStudent from "../../models/student";
export default function makeAddStudent({ db }) {
  return async function addStudent(studentInfo) {
    const student = makeStudent(studentInfo);
    const exists = await db.findById({ id: student.getId() }, db.collections.student);
    if (exists) {
      return exists;
    }

    return db.insert({
      id: student.getId(),
      neiuId: student.getNeiuId(),
      firstName: student.getFirstName(),
      lastName: student.getLastName(),
      email: student.getEmail(),
      about: student.getAbout(),
    }, db.collections.student);

  };
}