import responseTxt from "../../config/responseTxt";
import makeCourse from "../../models/course";

export default function makeEditCourse({ db }) {
  return async function editCourse({ id, ...changes }) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const existing = await db.findById({ id }, db.collections.course);
    if (!existing) {
      throw new RangeError(`Course ${responseTxt.notFound}`);
    }

    const course = makeCourse({ ...existing, ...changes });

    const updated = await db.update(
      {
        id: course.getCourseId(),
        section: course.getSection(),
        courseName: course.getCourseName(),
        semesterId: course.getSemesterId(),
        instructorName: course.getInstructorName(),
        instructorEmail: course.getInstructorEmail(),
      },
      db.collections.course
    );

    return { ...existing, ...updated };
  };
}
