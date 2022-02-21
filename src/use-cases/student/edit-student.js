import makeStudent from "../../models/student";
export default function makeEditStudent({ db }) {
  return async function editStudent({ id, ...changes } = {}) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    if (!changes.about) {
      throw new Error('You must supply "about"');
    }

    const existing = await db.findById({ id }, db.collections.student);
    if (!existing) {
      throw new RangeError("Student not found.");
    }

    const student = makeStudent({ ...existing, ...changes });

    const updated = await db.update(
      {
        id: student.getId(),
        neiuId: student.getNeiuId(),
        firstName: student.getFirstName(),
        lastName: student.getLastName(),
        email: student.getEmail(),
        about: student.getAbout(),
      },
      db.collections.student
    );

    return { ...existing, ...updated };
  };
}
