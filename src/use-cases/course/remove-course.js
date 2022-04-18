import responseTxt from "../../config/responseTxt";

export default function makeRemoveCourse({ db }) {
  return async function removeCourse({ id }) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const courseToDelete = await db.course.findById({ id });
    if (!courseToDelete) {
      throw new RangeError(`Course ${responseTxt.notFound}`);
    }

    return {
      deletedCount: await db.course.remove(courseToDelete),
      message: "course deleted.",
    };
  };
}
