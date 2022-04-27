export default function makeListCourses({ db, Roles, responseTxt }) {
  return async function listCourses({
    semesterId,
    searchTxt,
    user,
    page,
    limit,
  }) {
    if (!semesterId) {
      throw new Error(responseTxt.invalidId);
    }

    const semesterExists = await db.semester.findById({ id: semesterId });
    if (!semesterExists) {
      throw new Error(responseTxt.invalidSemesterId);
    }

    if (!user?.roles.includes(Roles.Admin)) {
      if (!semesterExists.active) {
        throw new Error(responseTxt.accessDenied);
      } else if (!searchTxt) {
        throw new Error("Please provide meaningful text to search with!");
      }
    }

    const regex = /^(?!.*([a-z])\1{2})[a-z0-9@-]+$/i;

    if (searchTxt) {
      if (!regex.test(searchTxt)) throw new Error(responseTxt.unsanitized);

      //return only courses that match searchTxt and instructorName != "TBA" or "tba"
      return await db.course.findMatchingCourses({
        semesterId,
        searchTxt,
        fields: ["id", "section", "courseName", "instructorName"],
      });
    }

    limit = parseInt(limit) || 8;
    page = parseInt(page) || 1;
    const skip = (page - 1) * limit;
    const countPromise = db.course.countTotal({ semesterId });
    const coursesPromise = db.course.findAll({ semesterId, skip, limit });

    const [count, courses] = await Promise.all([countPromise, coursesPromise]);
    const pageCount = Math.ceil(count / limit);

    return {
      pagination: { limit, count, pageCount },
      courses,
    };
  };
}
