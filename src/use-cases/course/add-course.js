import makeCourse from "../../models/course";
export default function makeAddCourse({ db }) {
  return async function addCourse(courseInfo) {
    const course = makeCourse(courseInfo);
    const semesterExists = await db.findById(
      { id: course.getSemesterId() },
      db.collections.semester
    );
    if (!semesterExists) {
      throw new Error("You must supply valid semester id!")
    }
    const exists = await db.findById(
      { id: course.getCourseId() },
      db.collections.course
    );

    if (exists) {
      return exists;
    }

    return db.insert(
      {
        id: course.getCourseId(),
        courseCode: course.getCourseCode(),
        courseName: course.getCourseName(),
        semesterId: course.getSemesterId(),
        instructorName: course.getInstructorName(),
        instructorEmail: course.getInstructorEmail(),
      },
      db.collections.course
    );
  };
}
