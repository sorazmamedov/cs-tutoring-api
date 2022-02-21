import makeCourse from "../../models/course";

export default function makeEditCourse({ db }) {
  return async function editCourse({ id, ...changes }) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    const existing = await db.findById({ id }, db.collections.course);
    if (!existing) {
      throw new RangeError("Course not found.");
    }

    const course = makeCourse({ ...existing, ...changes });

    const updated = await db.update(
      {
        id: course.getCourseId(),
        courseCode: course.getCourseCode(),
        courseName: course.getCourseName(),
        instructorName: course.getInstructorName(),
        instructorEmail: course.getInstructorEmail(),
      },
      db.collections.course
    );

    return { ...existing, ...updated };
  };
}