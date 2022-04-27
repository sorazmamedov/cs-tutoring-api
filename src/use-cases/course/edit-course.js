import makeCourse from "../../models/course";

export default function makeEditCourse({ db, responseTxt }) {
  return async function editCourse({ id, ...changes }) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const existing = await db.course.findById({ id });
    if (!existing) {
      throw new RangeError(`Course ${responseTxt.notFound}`);
    }

    const course = makeCourse({ ...existing, ...changes });

    const updated = await db.course.update({
      id: course.getCourseId(),
      section: course.getSection(),
      courseName: course.getCourseName(),
      semesterId: course.getSemesterId(),
      instructorName: course.getInstructorName(),
      instructorEmail: course.getInstructorEmail(),
    });

    return { ...existing, ...updated };
  };
}
