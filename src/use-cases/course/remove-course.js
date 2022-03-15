export default function makeRemoveCourse({ db }) {
  return async function removeCourse({ id }) {
    if (!id) {
      throw new Error("You must supply a valid id!");
    }

    const courseToDelete = await db.findById({ id }, db.collections.course);
    if (!courseToDelete) {
      throw new RangeError("Course not found.");
    }

    return {
      deletedCount: await db.remove(courseToDelete, db.collections.course),
      message: "course deleted.",
    };
  };
}
