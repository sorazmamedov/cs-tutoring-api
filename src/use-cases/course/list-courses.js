import responseTxt from "../../config/responseTxt";
import Roles from "../../config/roles";

export default function makeListCourses({ db }) {
  return async function listCourses({ semesterId, searchTxt, user }) {
    if (!semesterId) {
      throw new Error(responseTxt.invalidId);
    }

    const semesterExists = await db.findById(
      { id: semesterId },
      db.collections.semester
    );
    if (!semesterExists) {
      throw new Error(responseTxt.invalidSemesterId);
    }

    const regex = /^(?!.*([a-z])\1{2})[a-z0-9@-]+$/i;

    if (searchTxt) {
      if (!regex.test(searchTxt)) throw new Error(responseTxt.unsanitized);

      //return only courses that match searchTxt and instructorName != "TBA" or "tba"
      return await db.findMatchingCourses(semesterId, searchTxt, [
        "id",
        "section",
        "courseName",
        "instructorName",
      ]);
    }

    if (!user?.roles.includes(Roles.Admin)) {
      throw new Error(responseTxt.accessDenied);
    }
    return await db.findAll(db.collections.course, { semesterId });
  };
}
