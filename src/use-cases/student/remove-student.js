export default function makeRemoveStudent({ db }) {
  return async function removeStudent({ id } = {}) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    const studentToDelete = await db.findById({ id }, db.collections.student);
    if (!studentToDelete) {
      throw new RangeError("Student not found.");
    }

    return {
      deletedCount: await db.remove(studentToDelete, db.collections.student),
      message: "Student deleted.",
    };
  };
}
