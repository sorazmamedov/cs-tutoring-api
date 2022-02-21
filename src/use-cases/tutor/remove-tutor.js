export default function makeRemoveTutor({ db }) {
  return async function removeTutor({ id } = {}) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    const tutorToDelete = await db.findById({ id }, db.collections.tutor);
    if (!tutorToDelete) {
      throw new RangeError("Tutor not found.");
    }

    return {
      deletedCount: await db.remove(tutorToDelete, db.collections.tutor),
      message: "tutor deleted.",
    };
  };
}
